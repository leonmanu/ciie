const req = require('express/lib/request')
const utilidadesService = require('./utilidades.service')
const cohorteSheet = require('../sheets/cohorte.sheet')

const get = async () => {
    registros = await cohorteSheet.getTodos()
    return registros
}

const getUltimo = async () => {
    cohortes = await get()
    corteUltima = await utilidadesService.getUltimo(cohortes)
    return corteUltima
}

const getTodos = async (req, res) => {
    registros = await cohorteSheet.getTodos()
    const rolesJson = await utilidadesService.convertToJson(registros)
    return rolesJson
}

module.exports = {
    get:get,
    getTodos : getTodos,
    getUltimo,
} 