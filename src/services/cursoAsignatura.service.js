const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const cursoAsignaturaSheet = require('../sheets/cursoAsignatura.sheet')
const utilidadesService = require('./utilidades.service')


const get = async () => {
    const registros = await cursoAsignaturaSheet.get()
}

const getPorDocenteCargo = async (cargos) => {
    const cursoAsignaturas = await cursoAsignaturaSheet.get()
    const filtrados = cursoAsignaturas.filter(({ id }) => cargos.some(({ cursoAsignatura }) => id == cursoAsignatura ))

    return filtrados
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
    get : get,
    getPorClave: getPorClave,
    getPorCurso: getPorCurso,
    getPorDocenteCargo:getPorDocenteCargo,
} 