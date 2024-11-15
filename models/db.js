// Connnet DB
const Sequelize = require('sequelize');
const pg = require('pg')
const sequelize = new Sequelize('postgresql://blog_admin:kHG4QkIIbXMgY8rMFbpdGrtozBN4aj7e@dpg-cspsjql2ng1s7396dqig-a/blog_app_suza', {dialect: pg});



sequelize.authenticate().then(function(){
    console.log("DB connect sucessfull!")
}).catch(function(erro){
    console.log("DB not connect: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}