const req = require('express/lib/request')
const utilidadesService = require('./utilidades.service')
const encuentroHoraSheet = require('../sheets/encuentroHora.sheet')
const campoService = require('./campo.service')
const cohorteService = require('./cohorte.service')

const get = async () => {
    registros = await encuentroHoraSheet.get()
    return registros
}

const post = async (objeto) => {
    resultado = await encuentroHoraSheet.post(objeto)
    console.log(objeto)
    return objeto
}

const getUltimo = async () => {
    registros = await get()
    corteUltima = await utilidadesService.getUltimo(registros)
    return ultimo
}

async function put(objeto) {
    rn = parseInt(objeto.rowNumber)-2
    anteriores = await get()
    emparejado = await utilidadesService.emparejar(objeto, anteriores[rn]);
    await utilidadesService.getHeadersAndValues(emparejado)
    resultado = await encuentroHoraSheet.put(emparejado)
    if(resultado.success){ 
        resultadoJson = await utilidadesService.convertOneToJson(emparejado)
        resultado.objeto = resultadoJson
    }
    return resultado
}

const getPorCohorte = async (cohorteClave) => {
    cohorte = await cohorteService.getPorClave(cohorteClave)
    registros = await get()
    const filtrados = await registros.filter(row => row.idCohorte == cohorte.id)
    if(filtrados.length > 0){
        const resultadoJson = await utilidadesService.convertToJson(filtrados)
        const resultado = resultadoJson[0]
        return resultadoJson[0]
    } else {
        return null
    }
}

const getPorCampoCohorte = async (campoClave, cohorteClave) => {
    campo = await campoService.getPorClave(campoClave)
    cohorte = await cohorteService.getPorClave(cohorteClave)
    registros = await get()
    const filtrados = await registros.filter(row => row.idCampo == campo.id && row.idCohorte == cohorte.id)
    if(filtrados.length > 0){
        const resultadoJson = await utilidadesService.convertToJson(filtrados)
    const resultado = resultadoJson[0]
        return resultadoJson[0]
    } else {
        return null
    }
}

async function postOrPut(objeto) {
    
    if(objeto.rowNumber){
        resultado = await put(objeto);
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

const getFechas = async (objeto) => {
    fechasArray = []
    fechasArray.push(objeto.encuentro1)
    fechasArray.push(objeto.encuentro2)
    fechasArray.push(objeto.encuentro3)
    fechasArray.push(objeto.encuentro4)
    fechasArray.push(objeto.encuentro5)
    
    return fechasArray
}

module.exports = {
    get:get,
    getPorCohorte,
    getPorCampoCohorte,
    getUltimo,
    post,
    put,
    postOrPut,
    getFechas
} 