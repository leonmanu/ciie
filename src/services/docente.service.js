const docenteCargoSheet = require('../sheets/docenteCargo.sheet')
const cargoSheet =  require("../sheets/docenteCargo.sheet")
const usuarioService = require('./usuario.service')
const utilidadesService = require('./utilidades.service')
const { v4: uuidv4 } = require('uuid');
const cargoService = require('./cargo.service');
const docenteCargoService = require('./docenteCargo.service');
const personaService = require('./persona.service');


const get = async () => {
    resultados = await docenteCargoSheet.get()
    return resultados
}

const getPorCampoId = async (idCampo) => {
    const cargo = await cargoService.getPorCampo(idCampo)
    const docenteCargo = await docenteCargoService.getPorCargoId(cargo.id)
    const persona = await personaService.getPorUsuarioId(docenteCargo.idUsuario)
    return persona
}

const getJerarquiaMin = async (user) => {//este es el que manda los cargos por docentes
    const usuario = await usuarioService.getPorIdGoogle(user.id)
    const docenteCargos = await get()
    const filtrados = await docenteCargos.filter(row => row.idUsuario == usuario.id)
    return filtrados
}


const getCamposYDocentes = async (campos) => {
    cargos = await cargoService.get()
    docenteCargos = await docenteCargoService.get()
    personas = await personaService.get()
    await campos.forEach(async campo => {
        await cargos.forEach(async cargo =>{
            if (campo.id == cargo.idCampo) {
                await docenteCargos.forEach(async docenteCargo =>{
                    if (cargo.id == docenteCargo.idCargo) {
                        await personas.forEach(async persona =>{
                           if (docenteCargo.idUsuario == persona.idUsuario) {
                                campo.persona = persona
                           }
                        })
                        
                    }
                })
            }
        })
        //console.log("CAMPO: " + campo.clave + " | " + campo.persona.apellido + ", " + campo.persona.nombre)
    } )
    return campos
}


module.exports = {
    get:get,
    getPorCampoId,
    getCamposYDocentes
} 