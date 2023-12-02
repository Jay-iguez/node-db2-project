const Data = require('./cars-model')
const vin_validator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  const car = await Data.getById(id)

  if (car === undefined) {
    const error = Data.create_error(404, `car with id ${id} is not found`)
    next(error)
  } else {
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body

  const result = Data.check_undefined([{vin: vin}, {make: make}, {model: model}, {mileage: mileage}])

  if (result.value !== undefined){
    const error = Data.create_error(400, `${result.value} is missing`)
    next(error)
  } else if (result.value === undefined) {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body
  if (vin_validator.validate(vin) === true){
    next()
  } else {
    const error = Data.create_error(400, `vin ${vin} is invalid`)
    next(error)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} = req.body
  const cars = await Data.getAll()
  let car

  cars.forEach(check_car => {
    if (check_car.vin === vin){
      car = check_car
    }
  })

  if (car !== undefined){
    const error = Data.create_error(400, `vin ${vin} already exists`)
    next(error)
  } else {
    next()
  }
}

module.exports = {
  checkCarId, 
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}