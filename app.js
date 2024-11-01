const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin/admin')
// const Postagem = require('./models/Postagem')
// const Usuario = require('./models/Usuario')


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

// Routers

    app.use('/admin', admin)

// Server
const PORT = 8081
app.listen(PORT,() => {
    console.log('Server is on in localhost(Notes App)')
})  