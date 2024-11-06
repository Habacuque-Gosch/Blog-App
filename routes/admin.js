const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')



router.get('/', (req, res) => {
    console.log(Categoria)
    res.render('admin/index')
})

router.get('/categorias', (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias:categorias})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as categorias')
    })
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

router.all('/edit-categoria/:id', (req, res) => {

    Categoria.findOne({_id:req.params.id}).then((categoria) => {

        if (req.method == 'POST'){

            var nome_categoria = req.body.nome
            var slug_categoria = req.body.slug
    
            categoria.nome = nome_categoria
            categoria.slug = slug_categoria
    
            categoria.save().then(() => {
                req.flash('success_msg', 'categoria editada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao editar categoria')
                res.redirect('/admin/add-categoria')
            })

        } else {
            res.render('admin/edit_categoria', {categoria: categoria})
        }

    }).catch((erro) => {
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

router.get('/delete-categoria/:id', (req, res) => {
    Categoria.deleteOne({_id:req.params.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
        res.redirect('/admin/categorias')
    }).catch((erro) => {
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

module.exports = router