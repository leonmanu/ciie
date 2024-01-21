const req = require('express/lib/request')
const cursanteService = require('../services/cursante.service')
const cohorteService = require('../services/cohorte.service')
const calificacionService = require('../services/calificacion.service')

const get = async (req,res) => {
    registros = await cursanteService.get()
    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user})
}

const getPorCapacitacion = async (req,res) => {
    paramCampo = await req.params.campoClave
    cohorteUltima = await cohorteService.getUltimo()
    calificaciones = await calificacionService.get()
    cursantes = await cursanteService.getPorCampo(paramCampo, cohorteUltima.clave)
    //console.log("*getPorCapacitacion* / cohorteUltima --> " + cohorteUltima.clave)
    res.render("pages/cursante/asistencia", {user: req.user, cursantes, paramCampo, cohorteUltima, calificaciones})
}

module.exports = {
    get,
    getPorCapacitacion
}