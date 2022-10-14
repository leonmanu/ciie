const req = require('express/lib/request')
const rolSheet =  require("../sheets/rol.sheet")
const { RolDto } = require('../models/rol.class')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await rolSheet.getTodos()
    return registros
}

const getPorId = async (idRol) => {
    const registros = await rolSheet.get()
    const filtrados = await registros.filter(row => row.id == idRol)
    const rolesJson = await utilidadesService.convertToJson(filtrados)

    return rolesJson[0]
}

const getTodos = async (req, res) => {
    registros = await rolSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarquia
        })
    })
    return resultado
}

module.exports = {
    get:get,
    getTodos : getTodos,
    getPorId: getPorId,
} 