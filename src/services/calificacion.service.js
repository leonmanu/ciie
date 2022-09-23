const req = require('express/lib/request')
const boletinSheet = require('../sheets/boletin.sheet')
const calificacionSheet =  require("../sheets/calificacion.sheet")
const estudianteSheet = require('../sheets/estudiante.sheet')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    
    registros = await calificacionSheet.getCalificacion()

    return registros
}

const getUnique = async () => {
    
    registros = await calificacionSheet.getCalificacion()
    
    return registros
}

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
        //console.log("EXISTE:: ",calificacionExistente[0]._rowNumber)
        const resultado = await calificacionSheet.modificablesArray(calificacionExistente[0], jsonParse)
        return resultado
    } else {
        //console.log("NO existe:: ",jsonParse.rowNumber)
        //console.log("ESTUDIANTE: ",jsonParse)
        const resultado = await calificacionSheet.postCalificacion(jsonParse)
        return resultado
    }
    
}

const postArray = async (jsonArray) => {
    var i=0
    var modificables = []
    var agregables = []
    console.log("primer elemento: ",jsonArray[0].rowNumber)
    for (let index = 0; index < jsonArray.length; index++) {
       
        //resultado = await postCalificacion(jsonArray[index])
        if (typeof  jsonArray[i] !== 'undefined') {
            console.log("ROW-NUMBBER existe: ",jsonArray[i].rowNumber)
            //modificables.push(agregables)
            i++
        } else{
            //agregables.push(agregables)
            console.log("ROW-NUMBBER no: ",resultado.rowNumber)
        }
        console.log("indjsonArrayex: ", resultado)
    }
    
    return i
}

// const postArray = async (jsonArray) => {
//     var i=0
//     var modificables = []
//     for (let index = 0; index < jsonArray.length; index++) {
       
//         resultado = await postCalificacion(jsonArray[index])
//         if (resultado != null) {
//             modificables.push(resultado)
//             i++
//         }
//         console.log("indjsonArrayex: ", resultado)
//     }

//     await calificacionSheet.putArray(modificables)
//     return i
// }

//**********************>>>>>>>>>>>verificar si borrar

/*const getPorIdEstudiante = async (id) => {
    registros = await boletinSheet.getValoracion()
    filtrados = await registros.filter( row => row.estudiante == id )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}*/

const getCrudaPorIdEstudiante = async (id) => {
    registros = await boletinSheet.getValoracionCurda()
    filtrados = await registros.filter( row => row.estudiante == id )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}

const getPorDni = async (dni) => {
    console.log("DNI > ",dni)
    registros = await estudianteSheet.getTodo()
    filtrados = await registros.filter( row => row.dni == dni )
    //condicional si filtro.length > 0
    estudianteCursos = await estudianteSheet.getEstudianteCurso2()
    estudianteCurso = await estudianteCursos.filter(row => row.estudiante == filtrados[0].id)
    const resultadoJson = await utilidadesService.convertToJson(estudianteCurso)
    
    return estudianteCurso[0]
}

const getPorCurso = async (clave) => {
    registros = await boletinSheet.getValoracion()
    filtrados = filtrados = await registros.filter( row => row.cursoClave == clave )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}


module.exports = {
    get:get,
    postCalificacion: postCalificacion,
    getEstudiantePorAsignatura: getEstudiantePorAsignatura,
    getEstudianteAsignatura: getEstudianteAsignatura,
    getPorCursoAsignaturaOrden:getPorCursoAsignaturaOrden,
    getPorDni:getPorDni,
    //getPorIdEstudiante: getPorIdEstudiante,
    getPorCurso: getPorCurso,
    postArray: postArray,
    getCrudaPorIdEstudiante:getCrudaPorIdEstudiante,
    // getCargosTodos : getCargosTodos,
    // getPorDocente: getPorDocente,
    
    // getPorDocenteCargoCurso: getPorDocenteCargoCurso
} 