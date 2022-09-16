const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const cursoAsignaturaSheet = require('../sheets/cursoAsignatura.sheet')
const utilidadesService = require('./utilidades.service')


const getPorId = async (asignaturaId) => {
    
}

const getPorClave = async (asignaturaClave) => {
    
}

const getPorCurso = async (idCurso) => {
    const registros = await cursoAsignaturaSheet.getTodo()
    const filtrados = await registros.filter(row => row.curso == idCurso)
    //const resultadoJson = await utilidadesService.convertToJson(filtrados)

    return filtrados
}

module.exports = {
    getPorId : getPorId,
    getPorClave: getPorClave,
    getPorCurso: getPorCurso
} 