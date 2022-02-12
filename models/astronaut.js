const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");
const Spacecraft = require('./spacecraft');

const Astronaut = sequelize.define(
    "Astronaut",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type:DataTypes.STRING,
            validate:{len:[3,200]}
        },
        role: {
            type:DataTypes.STRING,
        }
    }
)

Spacecraft.hasMany(Astronaut,{foreignKey:'idSpacecraft', onDelete: 'CASCADE'});
Astronaut.belongsTo(Spacecraft,{foreignKey:'idSpacecraft'});

module.exports = Astronaut;