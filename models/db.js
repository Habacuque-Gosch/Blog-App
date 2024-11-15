// Connnet DB
const Sequelize = require('sequelize');
const pg = require('pg')
require('dotenv/config');

const sequelize = new Sequelize(process.env.connect_db, {dialect: pg});





sequelize.authenticate().then(function(){
    console.log("DB connect sucessfull!")
}).catch(function(erro){
    console.log("DB not connect: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}