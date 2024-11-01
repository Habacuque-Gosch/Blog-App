const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/home-admin', (req, res) => {
    res.send('teste admin')
})


module.exports = router