const req = require('express/lib/request')
const boletinSheet = require('../sheets/boletin.sheet')
const calificacionSheet =  require("../sheets/calificacion.sheet")
const estudianteSheet = require('../sheets/estudiante.sheet')
const utilidadesService = require('./utilidades.service')

const getEstudiantePorAsignatura = async (asignatura, curso) => {
    
    registros = await calificacionSheet.getCalificacion()
    resultado = await registros.filter( row => row.asignatura === asignatura && row.curso === curso)

    return resultado
}

const getPorCursoAsignaturaOrden = async (asignatura, clave) => {
    console.log("Asignatura ",asignatura," curso ",clave)
    registros = await calificacionSheet.getOrdenado()
    resultados = await registros.filter( row => row.asignatura == asignatura && row.curso == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)

    return resultadoJson
}

const getPorCursoOrden = async (clave) => {
    console.log(asignatura," curso ",clave)
    registros = await calificacionSheet.getOrdenado()
    resultados = await registros.filter( row => row.asignatura == asignatura && row.curso == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)

    return resultadoJson
}

const getEstudianteAsignatura = async (estudiante, asignatura) => { //para saber si existe estudiante con esa asignatura
    console.log("getSiExiteEstudianteAsignatura > ",estudiante," > ",asignatura)
    registros = await calificacionSheet.getCalificacionCruda()
    resultado = await registros.filter( row => row.estudiante === estudiante && row.asignatura === asignatura)

    return resultado
}

const postCalificacion = async (jsonParse) => {

    const calificacionExistente = await getEstudianteAsignatura(jsonParse.estudiante, jsonParse.asignatura)
    
    console.log("Calificción == ", calificacionExistente[0])
    
    if (calificacionExistente[0]) {
        console.log("EXISTE:: ",calificacionExistente[0]._rowNumber)
        const resultado = await calificacionSheet.putCalificacion(calificacionExistente[0], jsonParse)
        return resultado
    } else {
        console.log("NO existe:: ",jsonParse.rowNumber)
        console.log("ESTUDIANTE: ",jsonParse)
        const resultado = await calificacionSheet.postCalificacion(jsonParse)
        return resultado
    }
    
}

const getPorIdEstudiante = async (id) => {
    registros = await boletinSheet.getValoracion()
    filtrados = await registros.filter( row => row.estudiante == id )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}



const getPorDni = async (dni) => {
    console.log("DNI > ",dni)
    registros = await estudianteSheet.getEstudianteCurso()
    filtrados = await registros.filter( row => row.dni == dni )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson[0]
}

const getPorCurso = async (clave) => {
    registros = await boletinSheet.getValoracion()
    filtrados = filtrados = await registros.filter( row => row.cursoClave == clave )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}


module.exports = {
    postCalificacion: postCalificacion,
    getEstudiantePorAsignatura: getEstudiantePorAsignatura,
    getEstudianteAsignatura: getEstudianteAsignatura,
    getPorCursoAsignaturaOrden:getPorCursoAsignaturaOrden,
    getPorDni:getPorDni,
    getPorIdEstudiante: getPorIdEstudiante,
    getPorCurso: getPorCurso,
    // getCargosTodos : getCargosTodos,
    // getPorDocente: getPorDocente,
    
    // getPorDocenteCargoCurso: getPorDocenteCargoCurso
} 