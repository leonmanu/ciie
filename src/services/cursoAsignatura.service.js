const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const cursoAsignaturaSheet = require('../sheets/cursoAsignatura.sheet')
const utilidadesService = require('./utilidades.service')


const get = async () => {
    const registros = await cursoAsignaturaSheet.get()
}

const getPorDocenteCargo = async (docenteCargos) => {
    const registros = await cursoAsignaturaSheet.get()
    //const filtrados = registros.filter(({ id }) => docenteCargos.some(({ cursoAsignatura }) => id === cursoAsignatura ))
    const filtrados = docenteCargos.filter(({ cursoAsignatura }) => registros.some(({ id }) => id === cursoAsignatura ))
    console.log("docenteCargos: ", docenteCargos[0].cursoAsignatura," registros: ",registros[0].id)
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