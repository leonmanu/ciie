const req = require('express/lib/request')
const cargoService = require('../services/cargo.service')
//const cargoSheet = require('../sheets/cargo.sheet')

const getTodos = async (req, res) => {
    registros = await cargoService.getTodos()

    return registros
}

module.exports = {
    getTodos : getTodos,
} 