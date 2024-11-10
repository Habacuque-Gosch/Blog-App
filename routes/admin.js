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

    Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as categorias '+error)
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

    var id_categoria = req.params.id

    Categoria.findOne({where: {'id' : id_categoria}}).then((categoria) => {

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

router.get('/postagens', (req, res) => {
    Postagem.findAll({order: [['id', 'DESC']]},{include: [{
        model: Categoria,
        as: 'categoria'
    }]}).then((postagens) => {

        res.render('admin/postagens', {postagens: postagens})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as postagens')
        res.redirect('/admin')
    })
})

router.all('/add-postagens', (req, res) => {
    
    Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {
        

        if (req.method == 'POST'){

            var nome_postagem = req.body.titulo
            var slug_postagem = req.body.slug
            var descricao_postagem = req.body.descricao
            var conteudo_postagem = req.body.conteudo
            var categoria_postagem = req.body.categoria

            Postagem.create({
                titulo: nome_postagem,
                slug: slug_postagem,
                descricao: descricao_postagem,
                conteudo: conteudo_postagem,
                categoriaId: categoria_postagem
                }
            ).then(() => {
                console.log('success create post')
                req.flash('success_msg', 'Postagem criada com sucesso')
                res.redirect('/admin/postagens')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao criar categoria: ' +erro)
                res.redirect('/admin/add-postagens')
            })
    
        } else {
            res.render('admin/addpostagens', {categorias: categorias})
        }

    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as categorias')
        res.redirect('/admin')
    })
})

router.all('/edit-postagem/:id', (req,res) => {
    var id_post = req.params.id

    Postagem.findOne({include: [{
        model: Categoria,
        as: 'categoria'
    }]}, {where: {'id': id_post}}).then((postagem) => {

    Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {

        // Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {

        if(req.method == 'POST'){

            var nome_postagem = req.body.titulo
            var slug_postagem = req.body.slug
            var descricao_postagem = req.body.descricao
            var conteudo_postagem = req.body.conteudo
            var categoria_postagem = req.body.categoria

            postagem.titulo = nome_postagem,
            postagem.slug = slug_postagem,
            postagem.descricao = descricao_postagem,
            postagem.conteudo = conteudo_postagem,
            postagem.categoriaId = categoria_postagem

            console.log('id categoria do post' +categoria_postagem)

            postagem.save().then(() => {
                console.log('postagem editada com sucesso')
                req.flash('success_msg', 'postagem editada com sucesso')
                res.redirect('/admin/postagens')
            }).catch((erro) => {
                req.flash('error_msg', 'erro ao editar essa postagem')
                console.log(erro)
                res.redirect('/admin/postagens')
            })

        } else {
            res.render('admin/edit_postagem', {postagem: postagem, categorias:categorias})
        }

    })

    }).catch((erro) => {
        req.flash('error_msg', 'Essa postagem não existe')
        res.redirect('/admin/postagens')
    })
})

router.get('/delete-postagem/:id', (req, res) => {
    var id_post = req.params.id
    Postagem.destroy({where: {'id': id_post}}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso')
        res.redirect('/admin/postagens')
    }).catch((erro) => {
        req.flash('error_msg', 'Essa postagem não existe')
        res.redirect('/admin/postagens')
    })
})


<<<<<<< HEAD
=======

>>>>>>> f63db8254df153ef1b8e44e699049728b6a38db2
module.exports = router