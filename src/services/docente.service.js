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
    console.log("docente.service / getPorCampoId / persona "+persona.apellido)
    return persona
}

const getJerarquiaMin = async (user) => {//este es el que manda los cargos por docentes
    const usuario = await usuarioService.getPorIdGoogle(user.id)
    const docenteCargos = await get()
    const filtrados = await docenteCargos.filter(row => row.idUsuario == usuario.id)
    return filtrados
}



module.exports = {
    get:get,
    getPorCampoId

} 