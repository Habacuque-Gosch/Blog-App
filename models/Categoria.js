const db = require('./db')


const Categoria = db.sequelize.define('categorias',{
    nome: {
        type: db.Sequelize.STRING
    },
    slug: {
        type: db.Sequelize.STRING
    }
}
)

// SYNC MODEL
Categoria.sync({force: true}).then(function(){
    console.log('Model postagem criado com sucesso')
}).catch(function(erro){
    console.log('erro ao sync tabelas '+erro)
})

// Postagem.create({
//     nome: "teste js code",
//     slug: "slug_categoria"
// }).then(function(){
//     console.log('categoria criada com sucesso')
// }).catch(function(erro){
//     console.log('erro ao criar categoria '+erro)
// })


module.exports = Categoria