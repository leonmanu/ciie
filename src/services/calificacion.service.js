const req = require('express/lib/request')
const utilidadesService = require('./utilidades.service')
const calificacionSheet = require('../sheets/calificacion.sheet')
const cursanteSheet = require('../sheets/cursante.sheet')

const get = async () => {
    registros = await calificacionSheet.get()
    return registros
}

const postArray = async (jsonParse) => {
    console.log("Calificción == ", jsonParse)
    const resultado = await calificacionSheet.postCalificacion(jsonParse)
    return jsonParse
}

// const putArray = async (arrayJson) => {
//     console.log("Calificción == ", arrayJson)
//     const resultado = await cursanteSheet.put(arrayJson[0])
//     return resultado
// }

module.exports = {
    get,
    // putArray,
} 