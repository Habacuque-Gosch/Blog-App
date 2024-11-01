const express = require('express')
const router = express.Router()




router.get('/home-admin', (req, res) => {
    res.send('teste admin')
})





module.exports = router