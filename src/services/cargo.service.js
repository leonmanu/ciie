const req = require('express/lib/request')
const cargoSheet =  require("../sheets/cargo.sheet")


const getTodos = async (req, res) => {
    const registros = await cargoSheet.getTodos()
    const resultado = []
    await registros.forEach( registro => {
        resultado.push({ id: registro.id, asignatura: registro.asignaturaNombre})
    });
    return resultado
}

module.exports = {
    getTodos : getTodos
} 