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

        console.log('serializou o user: ' +usuario.nome)

        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({where: {'id': id}}).then((usuario) => {

            console.log('deserializou o user: ' +usuario.nome)

            done(null, usuario);

        })
    });
       
}