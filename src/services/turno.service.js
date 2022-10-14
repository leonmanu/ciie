const req = require('express/lib/request')

const { RolDto } = require('../models/rol.class')
const turnoSheet = require('../sheets/turno.sheet')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await turnoSheet.get()
    return registros
}

module.exports = {
    get:get,
} 