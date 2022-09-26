const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')

const get = async (req, res) => {
    const clave = req.params.clave
    const asignaturas = await asignaturaService.getPorCurso(clave)

    res.render('pages/curso/cursoAsignaturas', {user: req.user._json, asignaturas, clave})
}

module.exports = {
    getPorCurso: getPorCurso,
} 