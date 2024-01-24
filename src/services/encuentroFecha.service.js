const req = require('express/lib/request')
const utilidadesService = require('./utilidades.service')
const encuentroFechaSheet = require('../sheets/encuentroFecha.sheet')
const campoService = require('./campo.service')
const cohorteService = require('./cohorte.service')

const get = async () => {
    registros = await encuentroFechaSheet.get()
    return registros
}

const post = async (objeto) => {
    resultado = await encuentroFechaSheet.post(objeto)
    return registros
}

const getUltimo = async () => {
    registros = await get()
    corteUltima = await utilidadesService.getUltimo(registros)
    return ultimo
}

async function put(objeto) {
    resultado = await cursanteSheet.put(objeto)
    return resultado
}

const getPorCampoCohorte = async (campoClave, cohorteClave) => {
    campo = await campoService.getPorClave(campoClave)
    cohorte = await cohorteService.getPorClave(cohorteClave)
    registros = await get()
    const filtrados = await registros.filter(row => row.idCampo == campo.id && row.idCohorte == cohorte.id)
    if(filtrados.length > 0){
        const resultadoJson = await utilidadesService.convertToJson(filtrados)
    //const resultado = resultadoJson[0]
        return resultadoJson[0]
    } else {
        return null
    }
}

async function siExiste(objeto) {
    let rn = parseInt(objeto.rowNumber) - 2
    if(parseInt(objeto.rowNumber) > 0){
        anteriores = await get()
        emparejado = await utilidadesService.emparejar(objeto, anteriores[rn]);
        resultado = await encuentroFechaSheet.put(emparejado);
        
        return resultado

    } else {
        const campoClave = await objeto.campoClave
        const cohorteClave = await objeto.cohorteClave
        const campo = await campoService.getPorClave(campoClave)
        const cohorte = await cohorteService.getPorClave(cohorteClave)
        const nuevoId = await utilidadesService.crearId()
        objeto.id = await nuevoId
        objeto.idCampo = await campo.id
        objeto.idCohorte = await cohorte.id
        return await post(objeto)
    }
}

module.exports = {
    get:get,
    getPorCampoCohorte,
    getUltimo,
    post,
    put,
    siExiste,
} 