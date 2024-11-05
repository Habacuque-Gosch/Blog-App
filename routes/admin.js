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

        if(!nome_categoria || typeof nome_categoria == undefined || nome_categoria == null) {
            req.flash('error_msg', 'Nome inválido')
            res.redirect('/admin/add-categoria')
        }
        
        if(!slug_categoria || typeof slug_categoria == undefined || slug_categoria == null) {
            req.flash('error_msg', 'Slug inválido')
            res.redirect('/admin/add-categoria')
        } else {

            console.log(nome_categoria)
            console.log(slug_categoria)
    
            new Categoria({
                nome: nome_categoria,
                slug: slug_categoria
            }).save().then(() => {
                req.flash('success_msg', 'categoria criada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao criar categoria')
                res.redirect('/admin/add-categoria')
            })

        }


    }

    res.render('admin/addcategorias')
})

module.exports = router