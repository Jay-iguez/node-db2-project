const db = require('../../data/db-config')

const getAll = async () => {
  return await db('cars')
}

const getById = async (id) => {
  const [result] = await db('cars').where('id', id)
  return result
}

const create = async (data) => {
  const [id] = await db('cars').insert(data)
  const result = await getById(id)
  return result
}

const create_error = (status, msg) => {
  const error = new Error(msg)
  error.status = status
  return error
}

const check_undefined = (values) => {

  for (let i = 0; i < values.length; i++){
    let name_of_key
    for ( let key in values[i]){
      name_of_key = key
    } 
    
    if (!values[i][name_of_key]){
      return {value: name_of_key}
    }
  }

  return {value: undefined}

}

module.exports = {
  getAll,
  getById,
  create,
  create_error,
  check_undefined
}
