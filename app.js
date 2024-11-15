// LOAD MODULES
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const users = require('./routes/usuario')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const Postagem = require('./models/Postagem')
const Categoria = require('./models/Categoria')
const passport = require('passport')
require('./config/auth')(passport)
// var cookieParser=require('cookie-parser')



// CONFIG
    // Session
    app.use(session({
        secret: 'dsadsaddwaadsadsadasdsadasdw23213213213keytest',
        resave: true,
        saveUninitialized: true
    }))

    // app.use(cookieParser())

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        next()
    })

    // Template Engine
    app.engine('handlebars', handlebars.engine(({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })))
    app.set('view engine', 'handlebars')
    app.set('views', __dirname + '/views');

    // Body Parser
    // app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    // Public statics files
    app.use(express.static(path.join(__dirname,'public')))

// Routers

    app.get('/', (req, res) => { 
        
        Postagem.findAll(
            {include: [{
            model: Categoria,
            as: 'categoria'
            }]}).then((postagens) => {

            res.render('blog/index', {postagens: postagens})

        }).catch((error) => {
            req.flash('error_msg', 'houve um erro ao carregar as postagens: ' +error)
            res.render('blog/index')
        })
    })

    app.get('/categorias/', (req, res) => {
        Categoria.findAll({order: [['id', 'DESC']]}).then((categorias) => {
            res.render('blog/categorias', {categorias: categorias})
        }).catch((erro) => {
            req.flash('error_msg', 'Erro interno ao carregar as categorias: ')
            res.render('blog/categorias')
        })
    })

    app.get('/categoria/:slug', (req, res) => {
        var slug = req.params.slug

        Categoria.findOne({where: {'slug': slug}}).then((categoria) => {
            if (categoria) {

                Postagem.findAll({where: {'categoriaId': categoria.id}}).then((postagens) => {

                    req.flash('success_msg','Busca feita com sucesso')
                    res.render('blog/index', {postagens: postagens})
                }).catch((erro) => {
                    req.flash('error_msg','Postagens não encontrada: ' +erro)
                    res.render('blog/index')
                })

            } else {
                req.flash('error_msg', 'Categoria inexistente')
                res.redirect('/')
            }
        }).catch((erro) => {
            req.flash('error_msg', 'Erro ao carregar essa categoria: ' +erro)
            res.redirect('/')
        })
    })

    app.use('/admin', admin)

    app.use('/users/', users)

    app.use((req, res, next) => {
        res.status(404)
        res.render('erros/404')
    });
      
    app.use((req, res, next) => {
        res.status(403)
        res.render('erros/403')
    });
      
    app.use((req, res, next) => {
        res.status(500)
        res.render('erros/500')
    });

// STRUCTURE DOCSTRING
/**
* @description função responsavel por autenticar o usuario no sistema
* @param redirect
* @returns
*/

// Server
const PORT = 8081
app.listen(PORT,() => {
    console.log('Server is on in localhost(Blog App)')
})  