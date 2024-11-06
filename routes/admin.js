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

router.all('/add-categoria', (req, res) => {

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
                // res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao criar categoria')
                res.redirect('/admin/add-categoria')
            })
    
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

            console.log(categoria)
            
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

router.get('/postagens', (req, res) => {
    Postagem.findAll({order: [['id', 'DESC']]}).then(function(postagens){
        res.render('admin/postagens', {postagens: postagens})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as postagens')
        res.redirect('/admin')
    })
})


router.all('/add-postagens', (req, res) => {

    if (req.method == 'POST'){

        var nome_postagem = req.body.titulo
        var slug_postagem = req.body.slug
        var descricao_postagem = req.body.descricao
        var conteudo_postagem = req.body.conteudo

        if(!nome_postagem || typeof nome_postagem == undefined || nome_postagem == null) {
            req.flash('error_msg', 'Nome inválido')
            res.redirect('/admin/add-postagens')
        }

        if(!slug_postagem || typeof slug_postagem == undefined || slug_postagem == null) {
            req.flash('error_msg', 'Slug inválido')
            res.redirect('/admin/add-postagens')
        }

        if(!descricao_postagem || typeof descricao_postagem == undefined || descricao_postagem == null) {
            req.flash('error_msg', 'Descrição inválido')
            res.redirect('/admin/add-postagens')
        }
        
        if(!conteudo_postagem || typeof conteudo_postagem == undefined || conteudo_postagem == null) {
            req.flash('error_msg', 'Conteudo inválido')
            res.redirect('/admin/add-postagens')
        } else {

            Postagem.create({
                titulo: nome_categoria,
                slug: slug_categoria
            }).then(() => {
                req.flash('success_msg', 'categoria criada com sucesso')
                // res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao criar categoria')
                res.redirect('/admin/add-postagens')
            })

        }

    }

    res.render('admin/addpostagens')
})

module.exports = router