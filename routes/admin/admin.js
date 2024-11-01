const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.get('/add-categorias', (req,res) => {
    res.render('admin/addcategorias')
})

router.post('/nova-categoria', (req, res) => {
    res.send('adicionou uma nova categoria')
})


module.exports = router