const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/Usuario')



module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {

        User.findOne({where: {'email': email}}).then((usuario) => {
            if(!usuario){
                console.log('essa conta não existe')
                return done(null, false, {message: "essa conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (error, batem) => {

                if(batem){
                    console.log('user bateu senha: '+usuario)
                    return done(null, usuario, {message: 'usuario logado com sucesso'})
                } else {
                    return done(null, false, {message: 'Senha incorreta'})
                }

            })

        })

    }))

    passport.serializeUser((usuario, done) => {
        console.log('serializou o user')
        console.log('USER: '+usuario.nome)
        console.log('USER ID: '+usuario.id)
        done(null, usuario.id, {message: 'usuario logado com sucesso (serializer)'})
    })

    passport.deserializeUser((id, done) => {

        console.log('deserializou o user: ' +id)

        User.findOne({where: {'id': id}}, (error, usuario) => {
            console.log('deserializou o user: ' +usuario.nome)
            done(error, usuario, {message: 'deserializou o user: ' +usuario.nome})
        })
    })
}