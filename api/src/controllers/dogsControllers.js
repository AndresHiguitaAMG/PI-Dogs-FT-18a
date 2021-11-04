const { Dog, Temperament, Op } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;


const getDogs = async(req, res, next) => {
    try{
        let {
            name, 
            order,
            page 
        } = req.query

        let myInfo
        let allDogsDb
        let allData = []
        page = page ? page : 1;
        const recipePerPage = 8; 
        //#region name
        if(name && name !== "") {
            const allDogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
            myInfo = allDogsApi.data.filter(el => el.reference_image_id)
            const img = myInfo.map(async el => {
                return (await axios.get(`https://api.thedogapi.com/v1/images/${el.reference_image_id}`)).data
            })
            const response = await Promise.all(img)
            myInfo = response.map(el => {
                return {
                    image: el.url,
                    name: el.breeds[0].name,
                    temperament: el.breeds[0].temperament,
                    weight: el.breeds[0].weight,
                    id: el.breeds[0].id
                }
            })
            console.log(response);

            allDogsDb = await Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            allData = allDogsDb.concat(myInfo)
            // console.log(allData);
        }else{
            const allDogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            myInfo = allDogsApi.data.map(el => {
                return {
                    image: el.image.url,
                    name: el.name,
                    temperament: el.temperament,
                    weight: el.weight,
                    id: el.id
                } 
            })
            // console.log(myInfo);
            allDogsDb = await Dog.findAll({include: [Temperament]})
            const dogsDb = allDogsDb.map(el =>{
                const temperament = el.dataValues.temperaments.map(el => el.dataValues.name)
                return {
                    image: null,
                    name: el.name,
                    temperament,
                    weight: el.weight
                }
            })
            allData = dogsDb.concat(myInfo);
        }
        //#endregion

        //#region order
        if(order === "asc" || !order || order === ""){
            allData = allData.sort((a, b) =>{
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
        }else{
            allData = allData.sort((a, b) =>{
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
        }
        //#endregion

        //#region page
        let result = allData.slice((recipePerPage * (page - 1)), (recipePerPage * (page - 1)) + recipePerPage)
        //#endregion
        
        return res.json({
            //Envío al front el resultado, lo que van a mostrar, en pocas palabras la pagina cortada
            result: result,
            //Resultado total
            count: allData.length});
    }catch(error){
       next(error); 
    }
}

const responseByApi = async() => {
    try {
        const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const responseIdByApi = responseApi.data.map(el => {
            return {
                image: el.image.url,
                id: el.id,
                name: el.name,
                temperament: el.temperament,
                height: el.height,
                weight: el.weight,
                life_span: el.life_span
            }
        })
        return responseIdByApi
    }catch(error) {
        console.log(error);
    }
} 

const responseByDb = async() => {
    try{
        return await Dog.findAll({
            include:{
                model:Temperament,
                attributes:['name'],
                through:{
                    attributes:[]
                },
            }
        });
    }catch(error){
        console.log(error)
    }
}

const infoConnected = async() => {
    try{
        const infoApi = await responseByApi();
        const infoDb = await responseByDb();
        const infoTotal = infoApi.concat(infoDb);
        return infoTotal
    }catch(error){
        console.log(error);   
    }
}

const getDogsById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const infoMain = await infoConnected();
        if(id){
            let idByApi = infoMain.filter(el => el.id == (id));
            idByApi.length ? 
        res.status(200).send(idByApi) :
        res.status(400).send({message: "It was not found"})
        }
    }catch(error) {
        next(error);   
    }
}
        
const postDogs = async(req, res, next) =>{
    try{
        const { name, height, weight, life_span, temperament} = req.body;
        let createDog = await Dog.create({
            name,
            height,
            weight,
            life_span 
        })

        temperament.forEach(async el => {
            const temperaments = await Temperament.findOne({where:{name: el}});
            await createDog.setTemperaments(temperaments.dataValues.id);
            // console.log(temperaments.dataValues.id);
        });
        res.status(200).send("Successfully created");
    }catch(error){
        res.status(200).send("Error"); 
    }
}

module.exports = {
    getDogs,
    getDogsById, 
    postDogs
}