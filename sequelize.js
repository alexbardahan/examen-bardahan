const { Sequelize } = require('sequelize');

//creare conexiune la baza de date
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/proiect.db",
    define: {
        timestamps: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("All models were syncronized");
})

module.exports = sequelize;