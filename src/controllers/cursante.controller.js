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
const propuestaService = require('../services/propuesta.service')
const personaService = require('../services/persona.service')

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
    campo = await campoService.getPorClave(paramCampo)
    docente = await docenteService.getPorCampoId(campo.id)
    cohorteUltima = await cohorteService.getUltimo()
    console.log("docente: " + docente)
    cursantes = await cursanteService.getPorCohorte(cohorteUltima.clave)
    //fechas = await encuentroFechaService.getFechas(encuentroFecha)
    res.render("pages/cursante/listaAsistencia", {user: req.user, docente, cursantes, campo, cohorteUltima})
}


const getActaVolanteX = async (req, res) => {
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

const getCertificado = async (req, res) => {
    const paramCohorte = req.body.cohorte || '';
    const paramCampo = req.body.campoClave || '';
    const paramDni = req.body.dni || '';
    cohortesTodas = cohortes = await cohorteService.get()
    camposTodos = campos = await campoService.get()
   
    if (!paramCohorte && !paramCampo && !paramDni) {
        // Si todos los parámetros están en blanco, no se realizan las consultas
        console.log("paramCohorte: " + paramCohorte + " # paramCampo: " + paramCampo + " # paramDni: " + paramDni)
        res.render("pages/cursante/certificado", {user: req.user, cursantes: [], camposDocentes: [], cohortesTodas, camposTodos, paramCampo, paramCohorte});
        return;
    }

    propuestas = await propuestaService.get()
    cursantes = await cursanteService.getAprobados()
    //cohortesTodas = cohortes = await cohorteService.get()
    if (paramCohorte != '') {
        propuestas = await propuestas.filter(row => row.cohorte.toLowerCase() == paramCohorte.toLowerCase())
        //console.log(propuestas)
        cohortes = await cohortes.filter(row => row.clave.toLowerCase() == paramCohorte.toLowerCase())
        cursantes = await cursanteService.filtrarPorCohorte(cursantes, paramCohorte)
    }
    if (paramCampo != '') {
        //console.log("paramCampo: " + paramCampo)
        propuestas = await propuestas.filter(row => row.codigo == paramCampo)
        cursantes = await cursanteService.filtrarPorCampo(cursantes, paramCampo)
        campos = await campos.filter(row => row.clave == paramCampo)
    }
    if (paramDni != '') {
        //console.log("paramDni: " + paramDni)
        
        cursantes = await cursantes.cursanteService.getPorDni(cursantes, paramDni)
    }

    campos = await campoService.getCampoYPropuesta(campos, propuestas)
    campos = await encuentroFechaService.getCamposFechas(campos,cohortes)

    camposDocentes = await docenteService.getCamposYDocentes(campos)
    res.render("pages/cursante/certificado", {user: req.user, cursantes, camposDocentes, cohortesTodas, camposTodos, paramCampo, paramCohorte})
}

const getCertificadoBlanco = async (req, res) => {

    cohortesTodas = cohortes = await cohorteService.get()
    campos = await campoService.get()
    cursantes = []

    res.render("pages/cursante/certificado", {user: req.user, cohortesTodas,cursantes})
}

const getActaRetiro = async (req, res) => {
    const paramCohorte = req.body.cohorte || '';
    const paramCampo = req.body.campoClave || '';
    const paramDni = req.body.dni || '';
    cohortesTodas = cohortes = await cohorteService.get()
    campos = await campoService.get()

    if (!paramCohorte && !paramCampo && !paramDni) {
        // Si todos los parámetros están en blanco, no se realizan las consultas
        console.log("paramCohorte: " + paramCohorte + " # paramCampo: " + paramCampo + " # paramDni: " + paramDni)
        res.render("pages/cursante/actaRetiro", {user: req.user, cursantes: [], camposDocentes: [], cohortesTodas, paramCohorte: '--'});
        return;
    }

    propuestas = await propuestaService.get()
    cursantes = await cursanteService.getAprobados()
    cohortesTodas = cohortes = await cohorteService.get()
    if (paramCohorte != '') {
        console.log("paramCohorte: " + paramCohorte)
        propuestas = await propuestas.filter(row => row.cohorte.toLowerCase() == paramCohorte.toLowerCase())
        //console.log(propuestas)
        cohortes = await cohortes.filter(row => row.clave.toLowerCase() == paramCohorte.toLowerCase())
        cursantes = await cursanteService.filtrarPorCohorte(cursantes, paramCohorte)
    }
    if (paramCampo != '') {
        //console.log("paramCampo: " + paramCampo)
        propuestas = await propuestas.filter(row => row.codigo == paramCampo)
        cursantes = await cursanteService.filtrarPorCampo(cursantes, paramCampo)
        campos = await campos.filter(row => row.clave == paramCampo)
    }
    if (paramDni != '') {
        //console.log("paramDni: " + paramDni)
        
        cursantes = await cursantes.cursanteService.getPorDni(cursantes, paramDni)
    }

    campos = await campoService.getCampoYPropuesta(campos, propuestas)
    campos = await encuentroFechaService.getCamposFechas(campos,cohortes)

    camposDocentes = await docenteService.getCamposYDocentes(campos)
    res.render("pages/cursante/actaRetiro", {user: req.user, cursantes, camposDocentes, cohortesTodas, paramCohorte})
}

const getActaVolante = async (req, res) => {
    const paramCohorte = req.body.cohorte || '';
    const paramCampo = req.body.campoClave || '';
    cohortesTodas = cohortes = await cohorteService.get()
    camposTodos = campos = await campoService.get()

    if (!paramCohorte) {
        // Si todos los parámetros están en blanco, no se realizan las consultas
        res.render("pages/cursante/actaVolante2", {user: req.user, cursantes: [], camposDocentes: [], cohortesTodas, camposTodos, paramCohorte: '--', campos, paramCampo });
        return;
    }

    propuestas = await propuestaService.get()
    cursantes = await cursanteService.getPorCohorte(paramCohorte)
    cohortesTodas = cohortes = await cohorteService.get()
    propuestas = await propuestas.filter(row => row.cohorte.toLowerCase() == paramCohorte.toLowerCase())
    cohortes = await cohortes.filter(row => row.clave.toLowerCase() == paramCohorte.toLowerCase())
    //cursantes = await cursanteService.filtrarPorCohorte(cursantes, paramCohorte)

    if (paramCampo != '') {
        //console.log("paramCampo: " + paramCampo)
        propuestas = await propuestas.filter(row => row.codigo == paramCampo)
        cursantes = await cursanteService.filtrarPorCampo(cursantes, paramCampo)
        campos = await campos.filter(row => row.clave == paramCampo)
    }

    campos = await campoService.getCampoYPropuesta(campos, propuestas)
    campos = await encuentroFechaService.getCamposFechas(campos,cohortes)

    camposDocentes = await docenteService.getCamposYDocentes(campos)
    camposDocentes = await campoService.getCampoYCursante(camposDocentes,cursantes)
    console.log(camposDocentes[0].cursantes)
    res.render("pages/cursante/actaVolante2", {user: req.user, camposDocentes, cohortesTodas, camposTodos, paramCohorte,paramCampo})
}

const getAnalisis = async (req, res) => {
    const paramCohorte = req.body.cohorte || '';
    const paramCampo = req.body.campoClave || '';
    cohortesTodas = cohortes = await cohorteService.get()
    camposTodos = campos = await campoService.get()

    if (!paramCohorte) {
        // Si todos los parámetros están en blanco, no se realizan las consultas
        res.render("pages/cursante/analisis", {user: req.user, cursantes: [], camposDocentes: [], cohortesTodas, camposTodos, paramCohorte: '--', campos, paramCampo });
        return;
    }

    propuestas = await propuestaService.get()
    cursantes = await cursanteService.getPorCohorte(paramCohorte)
    cohortesTodas = cohortes = await cohorteService.get()
    propuestas = await propuestas.filter(row => row.cohorte.toLowerCase() == paramCohorte.toLowerCase())
    cohortes = await cohortes.filter(row => row.clave.toLowerCase() == paramCohorte.toLowerCase())
    //cursantes = await cursanteService.filtrarPorCohorte(cursantes, paramCohorte)

    if (paramCampo != '') {
        //console.log("paramCampo: " + paramCampo)
        propuestas = await propuestas.filter(row => row.codigo == paramCampo)
        cursantes = await cursanteService.filtrarPorCampo(cursantes, paramCampo)
        campos = await campos.filter(row => row.clave == paramCampo)
    }

    campos = await campoService.getCampoYPropuesta(campos, propuestas)
    campos = await encuentroFechaService.getCamposFechas(campos,cohortes)

    camposDocentes = await docenteService.getCamposYDocentes(campos)
    camposDocentes = await campoService.getCampoYCursante(camposDocentes,cursantes)
    console.log(camposDocentes[0].cursantes)
    res.render("pages/cursante/analisis", {user: req.user, camposDocentes, cohortesTodas, camposTodos, paramCohorte,paramCampo})
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
    getAnalisis,
    getActaRetiro,
    getCertificado,
    getCertificadoBlanco
    
}