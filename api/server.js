const express = require("express")
const cars_router = require('./cars/cars-router')

const server = express()

server.use(express.json())
server.use('/api/cars', cars_router)

module.exports = server
