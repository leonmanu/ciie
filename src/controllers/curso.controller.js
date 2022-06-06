const req = require('express/lib/request')

const cursoService = require('../services/curso.service')

const cursoGetTodo = async (req, res) => {
    registros = await cursoService.getTodos(req, res)
    res.send(registros)
}

module.exports = {
    cursoGetTodo: cursoGetTodo
} 