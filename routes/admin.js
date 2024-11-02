const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')



router.get('/', (req, res) => {
    console.log(Categoria)
    res.render('admin/index')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.all('/add-categoria', (req,res) => {

    if (req.method == 'POST'){
        var nome_categoria = req.body.nome
        var slug_categoria = req.body.slug

        console.log(nome_categoria)
        console.log(slug_categoria)

        new Categoria({
            nome: nome_categoria,
            slug: slug_categoria
        }).save().then(() => {
            console.log('categoria criada com sucesso')
        }).catch((erro) => {
            console.log('erro ao criar categoria: '+erro)
        })
    }

    res.render('admin/addcategorias')
})

module.exports = router