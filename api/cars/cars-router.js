const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.status(200).json({message: 'dog'})
    } catch(err) {
        res.status(500).json({message: 'not dog'})
    }
})

module.exports = router
// DO YOUR MAGIC
