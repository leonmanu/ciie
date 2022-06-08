const req = require('express/lib/request')
const rolSheet =  require("../sheets/rol.sheet")
const { RolDto } = require('../models/rol.class')


const getTodos = async (req, res) => {
    registros = await rolSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarqui
        })
    })
    return resultado
}

module.exports = {
    getTodos : getTodos
} 