const db = require('../../data/db-config')

const getAll = async () => {
  return await db('cars')
}

const getById = async (id) => {
  const [result] = await db('cars').where('id', id)
  return result
}

const create = () => {
  // DO YOUR MAGIC
}

const create_error = (status, msg) => {
  const error = new Error(msg)
  error.status = status
  return error
}

module.exports = {
  getAll,
  getById,
  create,
  create_error
}
