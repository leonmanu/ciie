const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')
const cursoService = require('../services/curso.service')

const getPorCurso = async (req, res) => {
    const clave = await req.params.clave
    const curso = await cursoService.getPorClave(clave)
    const asignaturas = await asignaturaService.getPorIdCurso(curso.idCurso)

    res.render('pages/curso/cursoAsignaturas', {user: req.user._json, asignaturas, clave})
}

module.exports = {
    getPorCurso: getPorCurso,
} 