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
            const allDogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key${API_KEY}`);
            myInfo = allDogsApi.data.map(el => {
                return {
                    image: el.reference_image_id,
                    name: el.name,
                    temperament: el.temperament,
                    weight: el.weight
                }
            })
            allDogsDb = await Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            allData = allDogsDb.concat(myInfo)
        }else{
            const allDogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            myInfo = allDogsApi.data.map(el => {
                return {
                    image: el.image.url,
                    name: el.name,
                    temperament: el.temperament,
                    weight: el.weight
                }
            })
            // console.log(myInfo);
            allDogsDb = await Dog.findAll({include: [Temperament]})
            const dogsDb = allDogsDb.map(el =>{
                const temperament = el.temperament.map(el => el.name)
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

const getDogsById = async(req, res, next) => {
    const id = req.params.id;
    if(id){
        try{
            if(!id.includes("-")){
                const idByApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
                const info = {
                    image: idByApi.data.url,
                    name: idByApi.data.name,
                    temperament: idByApi.data.temperament,
                    height: idByApi.data.height,
                    weight: idByApi.data.weight,
                    life_span: idByApi.data.life_span
                }
                res.json(info)
            }else{
                const dB = await Dog.findOne({
                    where: {
                        id: id
                    },
                    include: Temperament
                })
                const idByDb = {
                    image: null,
                    name: dB.name,
                    temperament: dB.temperament,
                    height: dB.height,
                    weight: dB.weight,
                    life_span: dB.life_span
                }
                if(!dB){
                    return res.status(400).send({message: "It was not found"})
                }
                return res.json(idByDb)
            }
        }catch(error){
           next(error); 
        }
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

        temperament.forEach(async el =>{
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