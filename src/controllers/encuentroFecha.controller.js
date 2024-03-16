const req = require('express/lib/request')

const encuentroFechaeService = require('../services/encuentroFecha.service')

const getPorCampoCohorte = async (req, res) => {
    const campoClave = await req.query.campoClave;
    const cohorteClave = await req.query.cohorteClave;
    const resultado = await encuentroFechaeService.getPorCampoCohorte(campoClave, cohorteClave);
    //const toJson = await utilidadesService.convertToJson(asignaturas)
    console.log("CTRL resultado: ",resultado)
    res.send(resultado);
}

const post = async (req, res) => {
    const resultado = await encuentroFechaeService.postOrPut(req.body)
    console.log("Controller POST -> resultado:  "+ resultado)
    res.send(resultado)
}

module.exports = {
    getPorCampoCohorte,
    post
} 