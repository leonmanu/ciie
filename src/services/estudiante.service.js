const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const estudianteCursoService =require("../services/estudianteCurso.service")
const utilidadesService = require('./utilidades.service')
const estudianteSchema = require('../models/estudiante.schema')
const estudianteDb = require('../db/estudiante.db')

const get = async () => { //este trae de la hoja estudiantes
    registros = await estudianteSheet.getTodo()
    return registros
}

const getTodos = async (req, res) => {
    registros = await estudianteSheet.getTodoEstudiante_sheet()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarqui
        })
    })
    return resultado
}

const getTodosDb = async (req, res) => {
    registros = await estudianteDb.getTodos()
    console.log("Data: ",registros)
    return registros
}

async function getUno(id){
    const registros =  await estudianteSheet.getTodo()
    const resultado = registros.filter(row => row.id == id)
    const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultadoJson[0]
    
}

async function getPorId(id){
    const registros =  await estudianteSheet.getTodo()
    const resultado = registros.filter(row => row.id == id)
    //console.log(resultadoJson[0])

    return resultado[0]
}

async function getPorDni(dni){
    const registros =  await estudianteSheet.getTodo()
    const resultado = registros.filter(row => row.dni == dni)
    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    console.log(resultado[0])

    return resultado[0]
    
}

async function getPorCursoAsignatura(req){
    console.log("getPorCurso: ", req.params.curso)
    const registros =  await estudianteSheet.getTodo()
    const resultados = registros.filter(row => row.curso === req.params.curso && row.idAsignatura == req.params.asignatura )

    return resultados
}

async function getPorCurso(clave){//1* anterior, próximo a borrar
    const registros =  await estudianteSheet.getTodoPorCurso()
    const resultados = await registros.filter(row => row.cursoClave == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    
    return resultadoJson
}

async function getPorIdCurso(idCurso){//1* este debería reemplazar a getPorCurso()
    const estudianteCurso =  await estudianteCursoService.get()
    const estudiantes = await this.get()
    const filtrados = estudiantes.filter(({ id: id }) => estudianteCurso.some(({ estudiante: estudiante, curso: curso, fechaBaja }) => id == estudiante && curso == idCurso && fechaBaja == null));
    const resultado = filtrados.sort((a, b) => a.apellido.localeCompare(b.apellido)) //esto ordena alfabéticamente
    console.log("RESULTADO: ",resultado)
    return resultado
}

// async function getPorIdCurso(clave){
//     const registros =  await estudianteSheet.getTodoPorCurso()
//     const resultados = await registros.filter(row => row.cursoClave == clave)
//     const resultadoJson = await utilidadesService.convertToJson(resultados)
    
//     return resultadoJson
// }

async function post(objeto){
    const ultimo = await this.getUltimo()
    objeto.id = (parseInt(ultimo.id)+1).toString()
    const registro =  await estudianteSheet.post(objeto)

    return registro
}

async function put(objExistente, objNuevo){
    console.log("estudianteService -> objExistente.length: ", objExistente._rowNumber)
    if(objExistente._rowNumber > 0){
        var header = objExistente._sheet.headerValues
            header.forEach(r => {
            console.log("header: foreach: ", r)
            objExistente[r] = objNuevo[r]
        })
    }

    resultado = await objExistente.save()
    console.log("objExistente ::   ", objExistente)
    return objExistente
}

async function getUltimo(){
    const registros =  await estudianteSheet.getTodo()
    const indice = registros.length
    const resultado = registros[indice - 1]

    return resultado
}

module.exports = {
    get:get,
    getTodos : getTodos,
    getUno: getUno,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorCurso:getPorCurso,
    post:post,
    getUltimo:getUltimo,
    getPorDni:getPorDni,
    getPorId: getPorId,
    put: put,
    getTodosDb:getTodosDb,
    getPorIdCurso:getPorIdCurso,
} 