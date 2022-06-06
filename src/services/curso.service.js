const req = require('express/lib/request')
const cursoSheet =  require("../sheets/curso.sheet")


const getTodos = async (req, res) => {
    registros = await cursoSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ idCurso: registro.idCurso, clave: registro.clave, turnoNombre: registro.turnoNombre})
    })
    return resultado
}

module.exports = {
    getTodos : getTodos
} 