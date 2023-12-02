const express = require('express')
const Data = require('../cars/cars-model')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('../cars/cars-middleware')
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
    } catch (err) {
        res.status(500).json({
            message: `Error in getting car of id: ${req.params.id}: ${err.message}`
        })
    }
})

router.post('/', [checkCarPayload, checkVinNumberValid, checkVinNumberUnique], async (req, res) => {
    try {
        const {vin, make, model, mileage, title, transmission} = req.body
        const body = {vin: vin, make: make, model: model, mileage: mileage, title: title, transmission: transmission}
        const new_car = await Data.create(body)
        res.status(201).json(new_car)
    } catch (err) {
        res.status(500).json({
            message: 'Error in creating new car: ' + err.message
        })
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: `${err.message}`
    }
    )
})

module.exports = router
// DO YOUR MAGIC
