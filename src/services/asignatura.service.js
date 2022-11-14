const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")
const cargoService = require('./cargo.service')
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
    const cursoAsignaturas = await cursoAsignaturaService.getPorCurso(id)
    const asignaturas = await asignaturaSheet.getTodo()
    const cargos = await cargoService.get()

    const resultado = []

    await cursoAsignaturas.forEach(cursoAsignatura => {
        let objetoNuevo = {
            nombre: String,
            nombreCorto: String,
            idCargo: String
        }
        asignaturas.forEach(asignatura => {
            if (cursoAsignatura.asignatura == asignatura.idAsignatura) {
                objetoNuevo.nombre = asignatura.asignatura
                objetoNuevo.nombreCorto = asignatura.nombreCorto
            }
        })

        cargos.forEach(cargo =>{
            if (cursoAsignatura.id == cargo.cursoAsignatura) {
                objetoNuevo.idCargo = cargo.id
            }
        })
        resultado.push(objetoNuevo)
    })

    console.log("///////:: ", resultado)

    //const filtrados = await asignaturas.filter(({ idAsignatura }) => cursoAsignaturas.some(({ asignatura }) => idAsignatura == asignatura));

    //const asignaturasJson = await utilidadesService.convertToJson(asignaturas)

    const resultados = await resultado.sort((a, b) => a.orden - b.orden) //esto ordena alfabéticamente
    //const resultadosJson = await utilidadesService.convertToJson(resultados)
    //console.log("Asignaturas: ", resultados)
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