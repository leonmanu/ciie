const req = require('express/lib/request')
const cargoService =  require("../services/docenteCargo.service")
const cursoService = require('../services/curso.service')
const rolService = require('../services/rol.service')


const getCargosTodos = async (req, res) => {
    cargos = await cargoService.getCargosTodos()
    cursos = await cursoService.getTodos()
    res.render("pages/cargo/cargoActuales", {cargos: cargos, cursos: cursos})
}

const getPorDocente = async (req, res) => {
    cargos = await cargoService.getPorDocente(req, res)
    cursos = await cursoService.getTodos()
    roles = await rolService.getTodos()
    res.render("pages/docenteCargo/docenteCargoActuales", {user: req.user, cargos: cargos, cursos: cursos, roles: roles})
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente:getPorDocente
} 