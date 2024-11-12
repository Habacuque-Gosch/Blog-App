const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')
const User = require('../models/Usuario')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs')
const passport = require('passport')




router.all('/', (req, res) => {
    
    if (req.method == 'post') {
        console.log('post')

    } else {

        res.render('users/home')
    }
})

router.all('/login', (req, res) => {

    // console.log(req.session)
    
    // if(req.method == 'POST') {

    // } else {

    res.render('users/login')
    // }
})

router.post('/login/authenticate',(req, res, next) => {

    console.log(req.method)

    console.log('AUTENTICATE IS ON')
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next)

    console.log('AUTENTICATE SUCCESSFULL')

})

router.all('/register', (req, res) => {
    if (req.method == 'POST') {
        var nome_user = req.body.user
        var email_user = req.body.email
        var senha_user = req.body.password_user
        var senha_confirme_user = req.body.password_user_repeat

        if(senha_user != senha_confirme_user) {
            req.flash('error_msg', 'Senhas são diferente, tente novamente')
            res.redirect('/users/register')
        } else { 

            User.findOne({where: {'email': email_user}}).then((usuario) => {
                console.log(usuario)

                if(usuario == null) {

                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(senha_user, salt, (erro, hash) => {
                            if(erro) {
                                req.flash('error_msg','Houve um erro ao salvar o usuário')
                                res.redirect('/users/register')
                            } else { 

                                senha_user = hash

                                User.create({
                                    nome: nome_user,
                                    email: email_user,
                                    senha: senha_user,
                                    flag_admin: false
                    
                                }).then(() => {
                                    req.flash('success_msg', nome_user+ ' cadastrado com sucesso')
                                    res.redirect('/')
                                }).catch((erro) => {
                                    req.flash('error_msg', 'Usuário não cadastrado: '+erro)
                                    res.redirect('/users/register')
                                })

                            }
                        })
                    })

                } else {
                    req.flash('error_msg','Usuario com este email já cadastrado ')
                    res.redirect('/users/register')

                }


            }).catch((erro) => {

                req.flash('error_msg','Erro ao consultar a existencia do usuario: '+erro)
                res.redirect('/users/register')

            })

        }

    } else {

        res.render('users/register')
    }
})



module.exports = router











module.exports = router
