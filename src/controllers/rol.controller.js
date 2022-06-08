const req = require('express/lib/request')

const rolService = require('../services/rol.service')

const getRolTodo = async (req, res) => {
    console.log("controller.RolGetTodo entró")
    registros = await rolService.getTodos()
    res.send(registros)
}

module.exports = {
    getRolTodo: getRolTodo
} 