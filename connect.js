const mongoose = require('mongoose')

// Config Mongoose
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/apptest').then(() =>{
        console.log('MongoDB conectado')
    }).catch((erro) =>{
        console.log('houveum erro ao se conectar ao mongoDB ' +erro)
    })

// Model - Usuarios
    const UsuarioSchema = mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        sobrenome: {
            type: String,
            require: false
        },
        email: {
            type: String,
            require: true
        },
        idade: {
            type: Number,
            require: true
        },
        pais: {
            type: String,
            require: false
        }
    })
// Collection
    mongoose.model('usuarios', UsuarioSchema)

    const usuario = mongoose.model('usuarios')

    new usuario({
        nome: 'Habas',
        sobrenome: 'Gosch',
        email:'habacuque@gmail.com',
        idade: 19,
        pais: 'Brasil'

    }).save().then(() =>{
        console.log('Usuario criado com sucesso')
    }).catch((erro) =>{
        console.log('Erro ao criar usuário '+erro)
    })