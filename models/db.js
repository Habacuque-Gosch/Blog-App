// Connnet DB
const Sequelize = require('sequelize');
const pg = require('pg')
require('dotenv').config()

const value_connect = process.env.connect_db

const sequelize = new Sequelize(value_connect, {dialect: pg});





sequelize.authenticate().then(function(){
    console.log("DB connect sucessfull!")
}).catch(function(erro){
    console.log("DB not connect: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}