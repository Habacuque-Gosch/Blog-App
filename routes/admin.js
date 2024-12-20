const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')
const { Op } = require('sequelize');
const {eAdmin} = require('../helpers/eAdmin')



router.get('/', eAdmin, (req, res) => {
    res.render('admin/')
})

router.get('/categorias', eAdmin, (req, res) => {

    Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'houve um erro ao carregar as categorias '+error)
        res.redirect('/admin')
    })
})

router.all('/add-categoria', eAdmin, (req, res) => {

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

        }

    } else {
        res.render('admin/addcategorias')
    }

})

router.all('/edit-categoria/:id', eAdmin, (req, res) => {

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

router.get('/delete-categoria/:id', eAdmin, (req, res) => {
    Categoria.destroy({where: {'id': req.params.id}}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
        res.redirect('/admin/categorias')
    }).catch((erro) => {
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', eAdmin, (req, res) => {
    Postagem.findAll(
        {include: [{
            model: Categoria,
            as: 'categoria'
        }]}).then((postagens) => {

        res.render('admin/postagens', {postagens: postagens})

    }).catch((erro) => {
        req.flash('error_msg', 'houve um erro ao carregar as postagens: ' +erro)
        res.redirect('/admin')
    })
})

router.all('/add-postagens', eAdmin, (req, res) => {
    
    Categoria.findAll({order: [['id', 'DESC']]}).then(function(categorias){

        if (req.method == 'POST'){

            var nome_postagem = req.body.titulo
            var slug_postagem = req.body.slug
            var descricao_postagem = req.body.descricao
            var conteudo_postagem = req.body.conteudo
            var categoria_postagem = req.body.categoria

            console.log('id categoria: ' +categoria_postagem)

            // var categoria_select = Postagem.belongsTo(Categoria)

            Postagem.create({
                titulo: nome_postagem,
                slug: slug_postagem,
                descricao: descricao_postagem,
                conteudo: conteudo_postagem,
                categoriaId: categoria_postagem
                }
            ).then(() => {
                console.log('success create post')
                req.flash('success_msg', 'categoria criada com sucesso')
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

router.all('/edit-postagem/:id', eAdmin, (req,res) => {
    id = req.params.id

    Postagem.findOne({where: {'id':id}}, {include: [{
        model: Categoria,
        as: 'categoria'
        }]}).then((postagem) => {

            Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {

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
        
                    postagem.save().then(() => {
                        req.flash('success_msg', 'postagem editada com sucesso')
                        res.redirect('/admin/postagens')
                    }).catch((erro) => {
                        req.flash('error_msg', 'erro ao editar essa postagem: '+erro)
                        res.redirect('/admin/postagens')
                    })
        
                } else {
        
                    res.render('admin/edit_postagem', {categorias: categorias, postagem: postagem})
                }

            }).catch((error) => {
                req.flash('error_msg', 'houve um erro ao carregar as categorias '+error)
                res.redirect('/admin/postagens')
            })

    }).catch((erro) => {
        req.flash('error_msg', 'Essa postagem não existe')
        res.redirect('/admin/postagens')
    })
})

router.get('/delete-postagem/:id', eAdmin, (req, res) => {
    var id_post = req.params.id
    Postagem.destroy({where: {'id': id_post}}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso')
        res.redirect('/admin/postagens')
    }).catch((erro) => {
        req.flash('error_msg', 'Essa postagem não existe')
        res.redirect('/admin/postagens')
    })
})

router.post('/buscar-postagem/', (req, res) => {

    var palavra_a_buscar = req.body.palavra

    Postagem.findAll({where: {
        titulo: {[Op.regexp] : palavra_a_buscar}
    }}, {include: [{
        model: Categoria,
        as: 'categoria'
        }]}).then((postagens) => {
            req.flash('success_msg','Busca feita com sucesso')
            res.render('blog/index', {postagens: postagens})

        }).catch((erro) => {
            req.flash('error_msg','Postagem não encontrada')
            res.render('blog/index')

        })
    
})


module.exports = router