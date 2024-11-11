const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')
const User = require('../models/Usuario')
const { Op } = require('sequelize');


router.all('/', (req, res) => {
    
    if (req.method == 'post') {
        console.log('post')

    } else {

        res.render('users/home')
    }
})

router.all('/login', (req, res) => {
    
    if (req.method == 'post') {
        console.log('post')

    } else {

        res.render('users/login')
    }
})

module.exports = router











module.exports = router
