const mongoose = require('mongoose')

// Model - Categoria

const CategoriaSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Categoria = mongoose.model('categorias',CategoriaSchema)

module.exports = Categoria