const req = require('express/lib/request')

const cursoService = require('../services/curso.service')

const cursoGetTodo = async (req, res) => {
    console.log("controller.cursoGetTodo entró")
    registros = await cursoService.getTodos(req, res)
    console.log("controller.cursoGetTodo ,,,", registros)
    res.send(registros)
}

module.exports = {
    cursoGetTodo: cursoGetTodo
} 