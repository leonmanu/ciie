const req = require('express/lib/request')
const { head } = require('request')
const utilidadesService = require('./utilidades.service')
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
            nombre: resultado[0].nombre,
            admin: resultado[0].admin
        }

        return usuarioInterface
    }catch(e){
        console.error(e.message," no se encontró objeto, devuelvo 'null' ");
        return resultado[0] = {email: null}
    }
}

const getTodosDb = async (req, res) => {
    registros = await usuarioDb.getTodos()
    console.log("Data: ",registros[0].cargo[0].rol)
    return registros
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

const esAdmin = async (email) => {
    registros = await usuarioDb.getTodos()
    console.log("Data: ",registros[0].cargo[0].rol)
    return registros
}

module.exports = {
    post,
    getPorId,
    getPorIdGoogle,
    put,
    getTodosDb,
    getPorEmail,
} 