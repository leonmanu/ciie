const req = require('express/lib/request')
//const { revistaGetTodos_Json } = require('../services/revista.service') esto puede servir

const revistaService = require('../services/revista.service')

const revistaGetTodo = async (req, res) => {
    registros = await revistaService.revistaGetTodos_Json(req, res)
    res.send(registros)
}

module.exports = {
    revistaGetTodo: revistaGetTodo
} 