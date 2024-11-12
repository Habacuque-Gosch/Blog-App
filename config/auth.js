const localStrategy = require('passport-local').Strategy
// const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const User = require('../models/Usuario')

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {

        User.findOne({where : {'email': email}}).then((usuario) => {
            if(!usuario) {
                return done(null, false, {message: "essa conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })

        })

    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({where : {'id': id}}, (erro, usuario) => {
            done(erro, user)
        })
    })

}