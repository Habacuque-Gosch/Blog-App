// Connnet DB
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgresql://blogapp_owner:UrGvQxS15gbj@ep-soft-brook-a5ns113b.us-east-2.aws.neon.tech/blogapp?sslmode=require', {dialect: 'postgres'});
     

sequelize.authenticate().then(function(){
    console.log("DB connect sucessfull!")
}).catch(function(erro){
    console.log("DB not connect: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}