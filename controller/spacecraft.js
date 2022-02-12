const { Op } = require("sequelize");
const Spacecraft = require("../models/spacecraft");

const getSpacecraft = async(req,res) => {
    try{
        const spacecrafts = await Spacecraft.findAll();
        return res.status(200).json(spacecrafts);
    } catch(err) {
        return res.status(500).json({ message:"getSpacecraft problem" })
    }
}

const postSpacecraft = async(req,res) => {
    try {
        const newSpacecraft = await Spacecraft.create(req.body);
        return res.status(200).json(newSpacecraft);
    } catch(err) {
        return res.status(500).json({ message:"eroare postSpacecraft" })
    }
}

const putSpacecraft = async(req,res) => {
    try{
        const idReq = req.params.id;
        const spacecraft = await Spacecraft.findByPk(req.params.id);
        if(spacecraft) {
            await spacecraft.update(req.body, { fields: ['name', 'speed', 'mass'] })
            return res.status(200).json(spacecraft);
        }
        else 
            return res.status(404).json({ message: "not found" });
    }catch(err){
        return res.status(500).json({message:"putSpacecraft problem"});
    }
}

const deleteSpacecraft = async(req,res) => {
    try{
        const idReq = req.params.id;
        const spacecraft = await Spacecraft.findByPk(req.params.id);
        
        if(spacecraft) {
            await spacecraft.destroy();
            return res.status(200).json({ message: "spacecraft deleted"});
        }
        else {
            return res.status(404).json({ message: "spacecraft not found" });
        }
    }catch(err) {
        return res.status(500).json({message:"deleteSpacecraft problem"});
    }
}

const searchSpacecraft = async (req, res) => {
    try {
        const value = req.query.value || '';
        const type = req.query.type || 'speed';
        const order = req.query.order || 'ASC';
        var results;
        if(type=="speed"){
             results= await Spacecraft.findAll({
                where: {
                    speed: {
                        [Op.gt]: `%${value}%`
                    },
                },
                order: [
                    ['speed', order] 
                ]
            });
        } else {
            results = await Spacecraft.findAll({
                where: {
                    mass: {
                        [Op.gt]: `%${value}%`
                    },
                },
                order: [
                    ['mass', order] 
                ]
            });
        }

        return res.status(200).json(results);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = { 
    getSpacecraft,
    postSpacecraft,
    putSpacecraft,
    deleteSpacecraft,
    searchSpacecraft,
};