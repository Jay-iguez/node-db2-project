const express = require('express')
const Data = require('../cars/cars-model')
const {checkCarId} = require('../cars/cars-middleware')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const cars = await Data.getAll()
        res.status(200).json(cars)
    } catch (err) {
        res.status(500).json({
            message: 'Error in getting cars: ' + err.message
        })
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    try {
        const { id } = req.params
        const car = await Data.getById(id)
        res.status(200).json(car)
    } catch(err) {
        res.status(500).json({
            message: `Error in getting car of id: ${req.params.id}: ${err.message}`
        })
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: `Middleware Error: ${err.message}`
    }
    )
})

module.exports = router
// DO YOUR MAGIC
