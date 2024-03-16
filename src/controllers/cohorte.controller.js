const req = require('express/lib/request')

const rolService = require('../services/rol.service')
const cohorteService = require('../services/cohorte.service')

const getUltimo = async () => {
    resultado = await cohorteService.getUltimo()
    console.log("getUltimo / registros --> " + resultado)
    res.send(resultado)
}

const getConFechaPorClaveAjax = async (req, res) => {
    const claveCohorte = await req.params.claveCohorte
    //console.log("claveCohorte: ",claveCohorte)
    //const curso = await cursoService.getPorId
    const cohortes = await cohorteService.getPorClave(claveCohorte)

    const toJson = await utilidadesService.convertToJson(asignaturas)
    res.send(toJson) 
}

module.exports = {
    getUltimo,
    getConFechaPorClaveAjax
} 