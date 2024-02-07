const req = require('express/lib/request')

const encuentroFechaeService = require('../services/encuentroFecha.service')

const getPorCampoCohorte = async (req, res) => {
    const campoClave = await req.body.campoClave
    const cohorteClave = await req.body.cohorteClave
    const resultado = await encuentroFechaeService.getPorCampoCohorte(campoClave, cohorteClave)
    res.send(resultado)
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