const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')

// CONFIG
    // Template Engine
    app.engine('handlebars', handlebars.engine(({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })))
    app.set('view engine', 'handlebars')

    // Body Parser
    // app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    // mongoose
    const mongoose = require('mongoose')
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/blogapp').then(() =>{
        console.log('MongoDB conectado')
    }).catch((erro) =>{
        console.log('houveum erro ao se conectar ao mongoDB ' +erro)
    })


    // Public statics files
    app.use(express.static(path.join(__dirname,'public')))

    app.use((req, res, next)=>{
        console.log('middleware is on')
        next()
    })

// Routers

    app.get('/', (req, res) => {
        res.render('blog/index')
    })

    app.use('/admin', admin)

// Server
const PORT = 8081
app.listen(PORT,() => {
    console.log('Server is on in localhost(Blog App)')
})  