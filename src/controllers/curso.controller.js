const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')
const calificacionService = require('../services/calificacion.service')

const cursoService = require('../services/curso.service')

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

module.exports = {
    cursoGetTodo: cursoGetTodo,
    getCursosTodos: getCursosTodos,
}