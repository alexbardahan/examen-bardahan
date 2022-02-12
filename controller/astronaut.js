const { Op } = require("sequelize");
const Astronaut = require("../models/astronaut");

const roles = ["COMMANDER","PILOT","GENERAL"];

const getAstronaut = async(req,res) => {
    try{
        const astronaut = await Astronaut.findAll();
        return res.status(200).json(astronaut);
    } catch(err) {
        return res.status(500).json({ message:"getAstronaut problem" })
    }
}

const postAstronaut = async(req,res) => {
    try {
        
        const newAstronaut = await Astronaut.create(req.body);
        return res.status(200).json(newAstronaut);
    } catch(err) {
        return res.status(500).json({ message:"eroare postAstronaut" })
    }
}

const putAstronaut = async(req,res) => {
    try{
        const idReq = req.params.id;
        const astronaut = await Astronaut.findByPk(req.params.id);
        if(astronaut) {
            await astronaut.update(req.body, { fields: ['name', 'role','idSpacecraft'] })
            return res.status(200).json(astronaut);
        }
        else 
            return res.status(404).json({ message: "not found" });
    }catch(err){
        return res.status(500).json({message:"putAstronaut problem"});
    }
}

const deleteAstronaut = async(req,res) => {
    try{
        const idReq = req.params.id;
        const astronaut = await Astronaut.findByPk(req.params.id);
        
        if(astronaut) {
            await astronaut.destroy();
            return res.status(200).json({ message: "astronaut deleted"});
        }
        else {
            return res.status(404).json({ message: "astronaut not found" });
        }
    }catch(err) {
        return res.status(500).json({message:"deleteAstronaut problem"});
    }
}


module.exports = { 
    getAstronaut,
    postAstronaut,
    putAstronaut,
    deleteAstronaut,
};


