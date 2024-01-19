const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const utilidadesService = require('./utilidades.service')
const estudianteSchema = require('../models/estudiante.schema')
const estudianteDb = require('../db/estudiante.db')
const usuarioDb = require('../db/usuario.db')
const usuarioSheet = require('../sheets/usuario.sheet')
const personaService = require('./persona.service')
const { v4: uuidv4 } = require('uuid');


const getPorEmail = async (email) => {
    const usuarios = await usuarioSheet.get()
    console.log("Usuario.Sheet getById: ", email)
    const resultado = await usuarios.filter(row => row.email == email)
    try{
        var usuarioInterface = {
            id: resultado[0].id,
            rol: resultado[0].rol,
            idGoogle: resultado[0].idGoogle,
            email: resultado[0].email,
            apellido: resultado[0].apellido,
            nombre: resultado[0].nombre
        }

        return usuarioInterface
    }catch(e){
        console.error(e.message," no se encontró objeto, devuelvo 'null' ");
        return resultado[0] = {email: null}
    }
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
    registros = await usuarioDb.getTodos()
    console.log("Data: ",registros[0].cargo[0].rol)
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
    const registros =  await usuarioSheet.get()
    const resultado = registros.filter(row => row.id == id)

    return resultado[0]
}

async function getPorIdGoogle(id){
    const registros =  await usuarioSheet.get()
    const resultado = registros.filter(row => row.idGoogle == id)
    console.log("resultado: ID> ",id)
    console.log("resultado:> ",resultado)

    return resultado[0]
}

async function getPorDni(dni){
    const registros =  await estudianteSheet.getEstudianteCurso()
    const resultado = registros.filter(row => row.dni == dni)
    const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultadoJson[0]
    
}

async function getPorCursoAsignatura(req){
    console.log("getPorCurso: ", req.params.curso)
    const registros =  await estudianteSheet.getTodo()
    const resultados = registros.filter(row => row.curso === req.params.curso && row.idAsignatura == req.params.asignatura )

    return resultados
}

async function getPorCurso(clave){
    const registros =  await estudianteSheet.getTodoPorCurso()
    const resultados = await registros.filter(row => row.cursoClave == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    
    return resultadoJson
}

async function post(objeto){
    let nuevoId = uuidv4()
    objeto.id = nuevoId
    
    var persona = await personaService.getPorCuil(objeto.cuil)
    
    if (!persona.cuil) {
        objetoPersona = objeto
        let nuevoId = uuidv4()
        objetoPersona.id = objeto.idPersona = nuevoId
        objetoPersona.idUsuario =  objeto.id
        await personaService.post(objetoPersona)
    } else {
        console.log("Persona Existe anterior: ", persona)
        objeto.idPersona = persona.id
    }

    const registro =  await usuarioSheet.post(objeto)

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
    getTodos : getTodos,
    getUno: getUno,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorCurso:getPorCurso,
    post:post,
    getUltimo:getUltimo,
    getPorDni:getPorDni,
    getPorId,
    getPorIdGoogle: getPorIdGoogle,
    put: put,
    getTodosDb:getTodosDb,
    getPorEmail:getPorEmail,
} 