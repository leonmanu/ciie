const req = require('express/lib/request')
const cargoService = require('../services/cargo.service')
const rolService = require('../services/rol.service')
const turnoService = require('../services/turno.service')
const utilidadesService = require('../services/utilidades.service')
//const cargoSheet = require('../sheets/cargo.sheet')

const getTodos = async (req, res) => {
    registros = await cargoService.getTodos(req, res)
    res.send(registros)
}

const getCargoPorRol = async (req, res) => {
    const idRol = req.body.idRol
    const cargos = await cargoService.getCargoPorRol(idRol)
    
    res.send(cargos)
}

const getPorIdCursoAjax = async (req, res) => {
    const idCurso = await req.params.idCurso
    console.log("idCurso: ",idCurso)
    //const curso = await cursoService.getPorId
    const asignaturas = await asignaturaService.getPorIdCurso(idCurso)
    const toJson = await utilidadesService.convertToJson(asignaturas)
    res.send(toJson) 
}

module.exports = {
    getTodos : getTodos,
    getCargoPorRol: getCargoPorRol
} 