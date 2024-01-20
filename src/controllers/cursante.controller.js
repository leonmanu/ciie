const req = require('express/lib/request')
const cursanteService = require('../services/cursante.service')

const get = async (req,res) => {
    registros = await cursanteService.get()
    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user})
}

const getPorCapacitacion = async (req,res) => {
    paramCampo = await req.params.campoClave
    registros = await cursanteService.getPorCampo(paramCampo)
    

    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user, paramCampo})
}

module.exports = {
    get,
    getPorCapacitacion
}