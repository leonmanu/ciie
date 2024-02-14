const req = require('express/lib/request')
const cursanteService = require('../services/cursante.service')
const cohorteService = require('../services/cohorte.service')
const calificacionService = require('../services/calificacion.service')
const encuentroFechaService = require('../services/encuentroFecha.service')
const campoService = require('../services/campo.service')

const get = async (req,res) => {
    registros = await cursanteService.get()
    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user})
}

const getPorCapacitacion = async (req,res) => {
    paramCampo = await req.params.campoClave
    cohorteUltima = await cohorteService.getUltimo()
    calificaciones = await calificacionService.get()
    cursantes = await cursanteService.getPorCampo(paramCampo, cohorteUltima.clave)
    encuentroFecha = await encuentroFechaService.getPorCampoCohorte(paramCampo,cohorteUltima.clave) 
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/asistencia", {user: req.user, cursantes, paramCampo, cohorteUltima, calificaciones, encuentroFecha})
}

const getPorCapacitacionCursantesDatos = async (req,res) => {
    paramCampo = await req.params.campoClave
    cohorteUltima = await cohorteService.getUltimo()
    calificaciones = await calificacionService.get()
    cursantes = await cursanteService.getPorCampo(paramCampo, cohorteUltima.clave)
    encuentroFecha = await encuentroFechaService.getPorCampoCohorte(paramCampo,cohorteUltima.clave) 
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/cursanteList", {user: req.user, cursantes, paramCampo, cohorteUltima, calificaciones, encuentroFecha})
}

const getListaAsistencia = async (req, res) => {
    paramCampo = await req.params.campoClave
    cohorteUltima = await cohorteService.getUltimo()
    cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/listaAsistencia", {user: req.user, cursantes, campo: paramCampo, cohorteUltima})
}

const getListaAsistenciaTodas = async (req, res) => {
    cohorteUltima = await cohorteService.getUltimo()
    campos = await campoService.get()
    cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/listaAsistenciaTodas", {user: req.user, cursantes, campos, cohorteUltima})
}

const putArray = async (req, res) => {
    arrayJson = req.body.arrayJson
    resultado = await cursanteService.putArray(arrayJson)

    res.send(resultado.toString())
}

module.exports = {
    get,
    getPorCapacitacion,
    getPorCapacitacionCursantesDatos,
    putArray,
    getListaAsistenciaTodas,
    getListaAsistencia,
}