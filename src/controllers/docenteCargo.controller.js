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
    console.log("docenteCargo.controller::: ", req.body)
    const cargoAsignatura = await docenteCargoService.getSiExiste(req.body.cursoAsignatura)
    if (cargoAsignatura.length > 0 ) {
        console.log("cargoAsignatura: ",cargoAsignatura[0].usuario)
        res.send('El cargo fue soliciatod por: ' + cargoAsignatura[0].usuario)
        await res.redirect('/docente/cargo')
    }
    else{
        resultado = await docenteCargoService.postDocenteCargo(req, res)
        console.log("cargoAsignatura: cargoAsignatura.length",cargoAsignatura.length)
    await res.redirect('/docente/cargo')
    }
}

const putBajaDocenteCargo = async(req, res) => {
    resultado = await docenteCargoService.putBajaDocenteCargo(req.params.rowNumber)
    await res.redirect('/docente/cargo')
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente:getPorDocente,
    postDocenteCargo: postDocenteCargo,
    getCargoCursoPorDocente:getCargoCursoPorDocente,
    putBajaDocenteCargo_controller:putBajaDocenteCargo
} 