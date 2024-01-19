const req = require('express/lib/request')
const campoSheet =  require("../sheets/campo.sheet")
const { RolDto } = require('../models/rol.class')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await campoSheet.get()
    return registros
}

const getPorId = async (idRol) => {
    const registros = await campolSheet.get()
    const filtrados = await registros.filter(row => row.id == idRol)
    const rolesJson = await utilidadesService.convertToJson(filtrados)

    return rolesJson[0]
}

module.exports = {
    get:get,
    getPorId: getPorId,
} 