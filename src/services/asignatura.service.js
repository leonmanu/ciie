const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const cursoAsignaturaService = require('./cursoAsignatura.service')
const utilidadesService = require('./utilidades.service')


const getPorId = async (asignaturaId) => {
    const registros = await asignaturaSheet.getTodo()
    const resultado = registros.filter(row => row.idAsignatura === asignaturaId)
    return resultado[0]
}

const getPorCodigo = async (asignaturaCodigo) => {
    const registros = await asignaturaSheet.getTodo()
    const resultado = registros.filter(row => row.codigo === asignaturaCodigo)
    return resultado[0]
}

const getPorClave = async (asignaturaClave) => {
    const registros = await asignaturaSheet.getTodo()
    const resultados = await registros.filter(row => row.clave === asignaturaClave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    //console.log("asignaturaService.getProClave: ",resultadoJson[0])
    
    return resultadoJson[0]
}

const getPorCursoAsignatura = async (cursoAsignatura) => {
    const asignaturas = await asignaturaSheet.getTodo()
    const filtrados = asignaturas.filter(({ idAsignatura }) => cursoAsignatura.some(({ asignatura }) => idAsignatura == asignatura ))
    //console.log("asignaturaService.getProClave: ",resultadoJson[0])
    
    return filtrados
}

const getPorCurso = async (clave) => {
    const registros = await asignaturaSheet.getAsignaturaCurso()
    const filtrados = registros.filter(row => row.cursoClave == clave)
    const resultadoJson = await utilidadesService.convertToJson(filtrados)

    return resultadoJson
}

const getPorIdCurso = async (id) => {
    const cursoAsignatura = await cursoAsignaturaService.getPorCurso(id)
    const asignaturas = await asignaturaSheet.getTodo()
    const filtrados = await asignaturas.filter(({ idAsignatura: id1 }) => cursoAsignatura.some(({ asignatura: id2 }) => id2 == id1));
    const resultados = await filtrados.sort((a, b) => a.orden - b.orden) //esto ordena alfabéticamente
    console.log("Asignaturas: ", resultados)
    return resultados
}

module.exports = {
    getPorId : getPorId,
    getPorCodigo:getPorCodigo,
    getPorClave: getPorClave,
    getPorCurso: getPorCurso,
    getPorIdCurso:getPorIdCurso,
    getPorCursoAsignatura:getPorCursoAsignatura,
} 