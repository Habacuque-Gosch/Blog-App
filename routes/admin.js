const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')
// const { Op } = require('sequelize');



router.get('/', (req, res) => {
    // console.log(Categoria)
    res.render('admin/')
})

router.get('/categorias', (req, res) => {
    // Categoria.find().sort({date: 'desc'}).then((categorias) => {
    //     res.render('admin/categorias', {categorias:categorias})
    // }).catch((error) => {
    //     req.flash('error_msg', 'houve um erro ao carregar as categorias')
    // })

    Categoria.findAll({order: [['id', 'DESC']]}).then(function(categorias){
        res.render('admin/categorias', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as categorias')
        res.redirect('/admin')
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

            Categoria.create({
                nome: nome_categoria,
                slug: slug_categoria
            }).then(() => {
                req.flash('success_msg', 'categoria criada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao criar categoria')
                res.redirect('/admin/add-categoria')
            })

            console.log(nome_categoria)
            console.log(slug_categoria)
    
            // new Categoria({
            //     nome: nome_categoria,
            //     slug: slug_categoria
            // }).save().then(() => {
            //     req.flash('success_msg', 'categoria criada com sucesso')
            //     res.redirect('/admin/categorias')
            // }).catch((erro) => {
            //     req.flash('error_msg', 'erro ao criar categoria')
            //     res.redirect('/admin/add-categoria')
            // })

        }

    }

    res.render('admin/addcategorias')
})

router.all('/edit-categoria/:id', (req, res) => {

    var id = req.params.id

    Categoria.findOne({where: {'id' : id}}).then((categoria) => {

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
    Categoria.destroy({where: {'id': req.params.id}}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
        res.redirect('/admin/categorias')
    }).catch((erro) => {
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

module.exports = router