const req = require('express/lib/request')
const campoSheet =  require("../sheets/campo.sheet")
const { RolDto } = require('../models/rol.class')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await campoSheet.get()
    const resultados = await registros.sort((a, b) => {
        const clveA = a.clave.toLowerCase();
        const clveB = b.clave.toLowerCase();
        return clveA.localeCompare(clveB, 'es', { sensitivity: 'accent' });
      });
    return resultados
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

const getCampoYCursante = async (camposDocentes, cursantes) => {
    for (const campo of camposDocentes) {
        campo.cursantes = []; // Inicializar campo.cursantes como un array
        for (const cursante of cursantes) {
            if (cursante['Seleccione su curso'].includes(campo.clave+' -') && cursante.Apto == 'TRUE') {
                campo.cursantes.push(cursante);
            }
        }
    }
    return camposDocentes;
}


module.exports = {
    get:get,
    getPorId: getPorId,
    getPorClave,
    getPorClavex,
    getCampoYPropuesta,
    getCampoYCursante
} 