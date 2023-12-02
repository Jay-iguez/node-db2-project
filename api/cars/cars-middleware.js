const Data = require('./cars-model')


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
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId, 
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}