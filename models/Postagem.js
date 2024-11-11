const Categoria = require('./Categoria')
const db = require('./db')


const Postagem = db.sequelize.define('postagens',{
    titulo: {
        type: db.Sequelize.STRING,
        require: true
    },
    slug: {
        type: db.Sequelize.STRING,
        require: true
    },
    descricao: {
        type: db.Sequelize.TEXT,
        require: true
    },
    conteudo: {
        type: db.Sequelize.TEXT,
        require: true
    },
    date: {
        type: db.Sequelize.DATE,
        default: Date.now()
    }
}
)

Postagem.belongsTo(Categoria)
// Categoria.belongsTo(Postagem)

// SYNC MODEL
// Postagem.sync({force: true}).then(() =>{
//     console.log('Model postagem criado com sucesso')
// }).catch((erro) =>{
//     console.log('erro ao sync tabelas '+erro)
// })

// Postagem.create({
//     nome: "teste js code",
//     slug: "slug_categoria"
// }).then(function(){
//     console.log('categoria criada com sucesso')
// }).catch(function(erro){
//     console.log('erro ao criar categoria '+erro)
// })


module.exports = Postagem