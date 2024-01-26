const req = require('express/lib/request')

const encuentroFechaeService = require('../services/encuentroFecha.service')

const getPorCampoCohorte = async (req, res) => {
    const campoClave = await req.body.campoClave
    const cohorteClave = await req.body.cohorteClave
    const resultado = await encuentroFechaeService.getPorCampoCohorte(campoClave, cohorteClave)
    res.send(resultado)
}

const post = async (req, res) => {
    resultado = await encuentroFechaeService.siExiste(req.body)
    res.redirect('/cursante/Adult')
}

module.exports = {
    getPorCampoCohorte,
    post
} 