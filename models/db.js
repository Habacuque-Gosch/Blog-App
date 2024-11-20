// Connnet DB
const Sequelize = require('sequelize');
const pg = require('pg')
require('dotenv').config()

const value_connect = 'postgresql://blog_admin:kHG4QkIIbXMgY8rMFbpdGrtozBN4aj7e@dpg-cspsjql2ng1s7396dqig-a.oregon-postgres.render.com/blog_app_suza?sslmode=none'

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