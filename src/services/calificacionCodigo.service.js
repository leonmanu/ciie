const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const calificacionCodigoSheet = require('../sheets/calificacionCodigo.sheet')
const utilidadesService = require('./utilidades.service')


const getTodo = async (asignaturaId) => {
    const registros = await calificacionCodigoSheet.getTodos()
    const resultadoJson = await utilidadesService.convertToJson(registros)
    console.log("calificacionCodigoServie -> resultadoJson: ",resultadoJson)
    return resultadoJson
}

// const getPorClave = async (asignaturaClave) => {
//     const registros = await asignaturaSheet.getTodo()
//     const resultados = await registros.filter(row => row.clave === asignaturaClave)
//     const resultadoJson = await utilidadesService.convertToJson(resultados)
//     console.log("asignaturaService.getProClave: ",resultadoJson[0])
    
//     return resultadoJson[0]
// }

module.exports = {
    getTodo : getTodo,

} 