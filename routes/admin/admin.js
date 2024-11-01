const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('pagina inicial admin')
})

router.get('/home-admin', (req, res) => {
    res.send('teste admin')
})


module.exports = router