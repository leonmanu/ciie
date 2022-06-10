const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const asignaturaService = require('../services/asignatura.service')



const getEstudianteAsignatura = async (req, res) => {
    const estudiantes = await estudianteService.getPorCurso(req)
    const asignatura = await asignaturaService.getPorId(req)
    console.log("controller.Calificacion entró", asignatura)

    res.render('pages/estudiante/calificacion', {user: req.user._json, estudiantes, asignatura})
}

module.exports = {
    getEstudianteAsignatura: getEstudianteAsignatura
} 