// Connnet DB
const Sequelize = require('sequelize');
const pg = require('pg')
const sequelize = new Sequelize('postgresql://postgres:2005@127.0.0.1/blog_app', {dialect: pg});



sequelize.authenticate().then(function(){
    console.log("DB connect sucessfull!")
}).catch(function(erro){
    console.log("DB not connect: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}