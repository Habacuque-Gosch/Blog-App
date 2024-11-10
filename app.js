// LOAD MODULES
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const Postagem = require('./models/Postagem')
const Categoria = require('./models/Categoria')



// CONFIG
    // Session
    app.use(session({
        secret: 'dsadsaddwaadsadsadasdsadasdw23213213213keytest',
        resave: true,
        saveUninitialized: true
    }))

    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
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

    // mongoose
    // const mongoose = require('mongoose')
    // mongoose.Promise = global.Promise
    // mongoose.connect('mongodb://localhost/blogapp').then(() =>{
    //     console.log('MongoDB conectado')
    // }).catch((erro) =>{
    //     console.log('houveum erro ao se conectar ao mongoDB ' +erro)
    // })

    // Public statics files
    app.use(express.static(path.join(__dirname,'public')))

// Routers

    app.get('/', (req, res) => {
        Postagem.findAll({order: [['id', 'DESC']]}, {include: [{
            model: Categoria,
            as: 'categoria'
        }]}).then((postagens) => {

            res.render('blog/index', {postagens: postagens})

        }).catch((error) => {
            req.flash('error_msg', 'houve um erro ao carregar as postagens: ' +error)
            res.redirect('/')
        })
    })

    app.use('/admin', admin)

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

// Server
const PORT = 8081
app.listen(PORT,() => {
    console.log('Server is on in localhost(Blog App)')
})  