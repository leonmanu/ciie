const req = require('express/lib/request')
const rolSheet =  require("../sheets/rol.sheet")
const { RolDto } = require('../models/rol.class')

const get = async () => {
    registros = await rolSheet.getTodos()
    return registros
}

const getTodos = async (req, res) => {
    registros = await rolSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarquia
        })
    })
    return resultado
}

module.exports = {
    get:get,
    getTodos : getTodos
} 