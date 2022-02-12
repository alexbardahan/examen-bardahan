const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Spacecraft = sequelize.define(
    "Spacecraft",
    {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type:DataTypes.STRING,
            validate:{len:[3,200]}
        },
        speed: {
            type:DataTypes.INTEGER,
            validate:{min:1000}
        },
        mass: {
            type:DataTypes.INTEGER,
            validate:{min:200}
        }
    }
)


module.exports = Spacecraft;