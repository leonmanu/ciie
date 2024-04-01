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

const getPorClave = async (clave) => {
    const registros = await get()
    const filtrados = await registros.filter(row => row.clave == clave)
    return filtrados[0]
}

const getPorClavex = async (clave) => {
    const registros = await get()
    const filtrados = await registros.filter(row => row.clave == clave)
    console.log("---> " + filtrados)
    return filtrados
}

const getCampoYPropuesta = async (campos, propuestas) => {

    for (const campo of campos) {
        for (const propuesta of propuestas) {
            if (campo.clave == propuesta.codigo) {
                campo.propuesta = propuesta;
                
            }
        }
    }

    return campos;
}

module.exports = {
    get:get,
    getPorId: getPorId,
    getPorClave,
    getPorClavex,
    getCampoYPropuesta
} 