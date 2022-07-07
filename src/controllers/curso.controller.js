const req = require('express/lib/request')

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

module.exports = {
    cursoGetTodo: cursoGetTodo,
    getCursosTodos: getCursosTodos,
    getEstudiantes: getEstudiantes
}