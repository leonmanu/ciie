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
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    //const resultado = resultadoJson[0]
    return resultadoJson[0]
}

async function siExiste(objeto) {
    
    let rn = parseInt(objeto.rowNumber) - 2
    console.log("rn : " + rn)
    if(parseInt(objeto.rowNumber) > 0){
        console.log("prSi " + rn)
        anteriores = await get()
        emparejado = await utilidadesService.emparejar(objeto, anteriores[rn]);
        resultado = await encuentroFechaSheet.put(emparejado);
        
        return resultado

    } else {
        console.log("prNo " + rn)
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