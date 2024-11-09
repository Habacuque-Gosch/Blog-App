// const mongoose = require('mongoose')
// const Categoria = require('./Categoria')
// const Schema = mongoose.Schema

// // Config Mongoose
//     mongoose.Promise = global.Promise
//     mongoose.connect('mongodb://localhost/blogapp').then(() =>{
//         console.log('MongoDB conectado')
//     }).catch((erro) =>{
//         console.log('houveum erro ao se conectar ao mongoDB ' +erro)
//     })

// Model - Usuarios
//     const UsuarioSchema = mongoose.Schema({
//         nome: {
//             type: String,
//             require: true
//         },
//         sobrenome: {
//             type: String,
//             require: false
//         },
//         email: {
//             type: String,
//             require: true
//         },
//         idade: {
//             type: Number,
//             require: true
//         },
//         pais: {
//             type: String,
//             require: false
//         }
//     })

// Model - Categoria
    
//     const CategoriaSchema = mongoose.Schema({
//         nome: {
//             type: String,
//             require: true
//         },
//         slug: {
//             type: String,
//             require: true
//         },
//         date: {
//             type: Date,
//             default: Date.now()
//         }
//     })
    

//     Collection

//     const Categoria = mongoose.model('categorias',CategoriaSchema)
    
//     new Categoria({
//         nome: 'teste categorias mong',
//         slug: 'teste',

//     }).save().then(() =>{
//         console.log('Categoria criado com sucesso')
//     }).catch((erro) =>{
//         console.log('Erro ao criar categoria: '+erro)
//     })

//     module.exports = Categoria

// Model - Postagens
    
    // const PostagemSchema = mongoose.Schema({
    //     titulo: {
    //         type: String,
    //         require: true
    //     },
    //     slug: {
    //         type: String,
    //         require: true
    //     },
    //     descricao: {
    //         type: String,
    //         require: true
    //     },
    //     conteudo: {
    //         type: String,
    //         require: true
    //     },
    //     categoria: {
    //         type: Schema.Types.ObjectId,
    //         ref: Categoria
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now()
    //     }
    // }
    // )
    

    // Collection

    // const Postagem = mongoose.model('postagens', PostagemSchema)

