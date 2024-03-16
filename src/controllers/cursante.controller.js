const req = require('express/lib/request')
const cursanteService = require('../services/cursante.service')
const cohorteService = require('../services/cohorte.service')
const calificacionService = require('../services/calificacion.service')
const encuentroFechaService = require('../services/encuentroFecha.service')
const campoService = require('../services/campo.service')
const encuentroHoraService = require('../services/encuentroHora.service')
const cargoService = require('../services/cargo.service')
const docenteCargoService = require('../services/docenteCargo.service')
const docenteCargoSheet = require('../sheets/docenteCargo.sheet')
const docenteService = require('../services/docente.service')

const get = async (req,res) => {
    registros = await cursanteService.get()
    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user})
}

const getPorCapacitacion = async (req,res) => { //esta antes filtraba también por cohorte, ahora no
    paramCampo = await req.params.campoClave
    cohorteUltima = await cohorteService.getUltimo()
    cohortes = await cohorteService.get()
    calificaciones = await calificacionService.get()
    cursantes = await cursanteService.getPorCampo(paramCampo)
    encuentroFecha = await encuentroFechaService.getPorCampoCohorte(paramCampo,cohorteUltima.clave) 
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/asistencia", {user: req.user, cursantes, paramCampo, cohorteUltima, cohortes, calificaciones, encuentroFecha})
}

const getPorCapacitacionCohorte = async (req,res) => { //esta era getPorCapacitacion pero ahora necesito que no lo haga por cohorte
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


const getActaVolante = async (req, res) => {
    paramCampo = await req.params.campoClave
    campo = await campoService.getPorClave(paramCampo)
    cohorteUltima = await cohorteService.getUltimo()
    cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    calificaciones = await calificacionService.get()
    encuentroFecha = await encuentroFechaService.getPorCampoCohorte(paramCampo,cohorteUltima.clave) 
    docente = await docenteService.getPorCampoId(campo.id)
    console.log(" cursante.controller / getActaVolante / docente: " + docente.apellido)
    res.render("pages/cursante/actaVolante", {user: req.user, cursantes, campo, cohorteUltima, calificaciones, encuentroFecha, docente})
}

const getListaAsistenciaTodas = async (req, res) => {
    cohorteUltima = await cohorteService.getUltimo()
    campos = await campoService.get()
    cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/listaAsistenciaTodas", {user: req.user, cursantes, campos, cohorteUltima})
}

const getConstancia = async (req, res) => {
    paramCampo = await req.params.campoClave
    paramDni = await req.params.dni
    cohorteUltima = await cohorteService.getUltimo()
    campo = await campoService.getPorClave(paramCampo)
    if (paramDni) {
        cursantes = await cursanteService.getPorDni(paramDni)
    } else {
        cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    }

    
    encuentroFecha = await encuentroFechaService.getPorCampoCohorte(paramCampo,cohorteUltima.clave)
    encuentroHora = await encuentroHoraService.getPorCampoCohorte(paramCampo,cohorteUltima.clave) 
    res.render("pages/cursante/constancias", {user: req.user, cursantes, campo, cohorteUltima, encuentroFecha, encuentroHora})
}

const getConstanciaPorCursante = async (req, res) => {
    paramCampo = await req.params.dni
    cursantes = await cursanteService.getPorDni(paramCampo)
    console.log("cursantes[0] : " + cursantes)
    cohorteUltima = await cohorteService.getUltimo()
    campos = await campoService.get()
    encuentroFecha = await encuentroFechaService.getPorCohorte(cohorteUltima.clave)
    encuentroHora = await encuentroHoraService.getPorCohorte(cohorteUltima.clave) 
    res.render("pages/cursante/constanciasIndividual", {user: req.user, cursantes, campo:campos, cohorteUltima, encuentroFecha, encuentroHora})
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
    getConstancia,
    getConstanciaPorCursante,
    getActaVolante,
}