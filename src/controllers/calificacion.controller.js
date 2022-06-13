const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const asignaturaService = require('../services/asignatura.service')
const cursoService = require('../services/curso.service')



const getEstudianteAsignatura = async (req, res) => {
    console.log(`Curso: ${req.body.curso} Asignatura: ${req.body.idAsignatura}`)
    const estudiantes = await estudianteService.getPorCurso(req.body.curso,res)
    const asignatura = await asignaturaService.getPorId(req.body.idAsignatura)
    console.log("controller.Calificacion entró", estudiantes)

    res.send(estudiantes)
}

const getCursoYAsignatura = async (req, res) => {
    const curso = await cursoService.getPorClave(req.params.curso)
    const asignatura = await asignaturaService.getPorId(req.params.asignatura)
    console.log("CURSO == ", curso)

    res.render('pages/estudiante/calificacion', {user: req.user._json, curso, asignatura})
}

module.exports = {
    getEstudianteAsignatura: getEstudianteAsignatura,
    getCursoYAsignatura_controller :getCursoYAsignatura
} 