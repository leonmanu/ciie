const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')
const calificacionService = require('../services/calificacion.service')

const cursoService = require('../services/curso.service')
const estudianteService = require('../services/estudiante.service')

const cursoGetTodo = async (req, res) => {
    console.log("controller.cursoGetTodo entró")
    registros = await cursoService.getTodos(req, res)
    console.log("controller.cursoGetTodo ,,,", registros)
    res.send(registros)
}

const getCursosTodos = async (req, res) => {
    registros = await cursoService.getCursosTodos()
    res.render("pages/curso/cursos", {user: req.user, cursos: registros})
}

const getEstudiantes = async (req, res) => {
    const clave = req.params.clave
    registros = await estudianteService.getPorCurso(clave)
    res.render("pages/curso/cursoEstudiantes", {user: req.user, clave, estudiantes: registros})
}

const getBoletines = async (req, res) => {
    const clave = req.params.clave
    estudiantes = await estudianteService.getPorCurso(clave)
    registros = await calificacionService.getPorCurso(clave)
    const asignaturas = await asignaturaService.getPorCurso(clave)
    console.log("Registros:: ", registros)
    res.render("pages/boletin/boletinesCurso", {user: req.user, clave, estudiantes, registros, asignaturas})
}

module.exports = {
    cursoGetTodo: cursoGetTodo,
    getCursosTodos: getCursosTodos,
    getEstudiantes: getEstudiantes,
    getBoletines: getBoletines,
}