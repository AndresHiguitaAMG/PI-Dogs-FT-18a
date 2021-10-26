const { Temperament } = require('../db');

const getTemperaments = async(req, res, next) =>{
    try{
        const dBInfo = await Temperament.findAll();
        if(dBInfo.length)
        return res.status(200).json(dBInfo.map(el => el.name))
        else{
            return res.status(400).json({message: "Your request could not be processed"})
        }
    }catch(error){
        next(error);
    }
}
module.exports = {
    getTemperaments
}