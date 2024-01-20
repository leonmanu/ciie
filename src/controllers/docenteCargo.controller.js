const req = require('express/lib/request')
const docenteCargoService =  require("../services/docenteCargo.service")
const cargoService =  require("../services/cargo.service")
const cursoService = require('../services/curso.service')
const rolService = require('../services/rol.service')
const revistaService = require('../services/revista.service')
const cursoAsignaturaService = require('../services/cursoAsignatura.service')
const asignaturaService = require('../services/asignatura.service')
const campoService = require('../services/campo.service')


const getCargosTodos = async (req, res) => {
    cargos = await cargoService.getCargosTodos() 
    cursos = await cursoService.getTodos()
    res.render("pages/cargo/cargoActuales", {cargos: cargos, cursos: cursos})
}

const getPorDocente = async (req, res) => {
    const docenteCargos = await docenteCargoService.getPorDocente(req.user)
    const cargos = await cargoService.get()
    const roles = await rolService.get()
    const campos = await campoService.get()
    const revistas = await revistaService.get()


    res.render("pages/docenteCargo/docenteCargoActuales", {user: req.user, docenteCargos, cargos,roles,campos,revistas})
}

const getCargoCursoPorDocente = async (req, res) => {
    cargos = await cargoService.getPorDocenteCargoCurso(req, res)
    res.render("pages/docenteCargo/docenteCargoCurso", {user: req.user, cargos: cargos})
}

const post = (req, res) => {
    sheet.post(req.body)
    res.redirect('/')
}

const postDocenteCargo = async (req, res) => {
    const cargoAsignatura = await docenteCargoService.postDocenteCargo(req.body, req.user)
    
    await res.redirect('/docente/cargo')
}

const getSiDisponible = async (req, res) => {
    const cargo = req.body.jsonObjet
    console.log("cargoAJAX:: ", cargo)
    const resultado = await docenteCargoService.getSiDisponible(cargo)
    console.log("docenteCargo.Controller:: ", resultado)
    res.send(resultado)
} 

const putBajaDocenteCargo = async(req, res) => {
    console.log("BBAAJJAA:: ",req.params.id,"|||",req.user.id)
    resultado = await docenteCargoService.putBajaDocenteCargo(req.params.id,req.user.id)
    await res.redirect('/docente/cargo')
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente:getPorDocente,
    postDocenteCargo: postDocenteCargo,
    getCargoCursoPorDocente:getCargoCursoPorDocente,
    putBajaDocenteCargo_controller:putBajaDocenteCargo,
    getSiDisponible:getSiDisponible,
} 