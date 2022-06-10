const req = require('express/lib/request')
const docenteCargoService =  require("../services/docenteCargo.service")
const cargoService =  require("../services/docenteCargo.service")
const cursoService = require('../services/curso.service')
const rolService = require('../services/rol.service')
const revistaService = require('../services/revista.service')


const getCargosTodos = async (req, res) => {
    cargos = await cargoService.getCargosTodos() 
    cursos = await cursoService.getTodos()
    res.render("pages/cargo/cargoActuales", {cargos: cargos, cursos: cursos})
}

const getPorDocente = async (req, res) => {
    cargos = await cargoService.getPorDocente(req, res)
    cursos = await cursoService.getTodos()
    res.render("pages/docenteCargo/docenteCargoActuales", {user: req.user, cargos: cargos, cursos: cursos})
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
    resultado = await docenteCargoService.postDocenteCargo(req, res)
    await res.redirect('/docente/cargo')
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente:getPorDocente,
    postDocenteCargo: postDocenteCargo,
    getCargoCursoPorDocente:getCargoCursoPorDocente
} 