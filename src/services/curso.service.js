const req = require('express/lib/request')
const cursoSheet =  require("../sheets/curso.sheet")
const utilidadesService = require('./utilidades.service')


const getTodos = async (req, res) => {
    registros = await cursoSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ idCurso: registro.idCurso, clave: registro.clave, turnoNombre: registro.turnoNombre})
    })
    return resultado
}

const getPorClave = async (claveCurso) => {
    const registros = await cursoSheet.getTodos()
    const resultados = await registros.filter(row => row.clave === claveCurso)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    return resultadoJson[0]
}

module.exports = {
    getTodos : getTodos,
    getPorClave: getPorClave
} 