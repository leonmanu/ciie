const req = require('express/lib/request')
const cargoService = require('../services/cargo.service')
//const cargoSheet = require('../sheets/cargo.sheet')

const getTodos = async (req, res) => {
    registros = await cargoService.getTodos(req, res)
    res.send(registros)
}

const getCargoPorRol = async (req, res) => {
    registros = await cargoService.getCargoPorRol(req, res)
    //console.log("getCargoPorRol: ",registros)
    res.send(registros)
}

module.exports = {
    getTodos : getTodos,
    getCargoPorRol: getCargoPorRol
} 