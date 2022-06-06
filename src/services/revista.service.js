const req = require('express/lib/request')
const revistaSheet =  require("../sheets/revista.sheet")


const revistaGetTodos_Json = async (req, res) => {
    registros = await revistaSheet.revistaGetTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ id: registro.id, nombre: registro.nombre, clave: registro.clave})
    })
    return resultado
}

module.exports = {
    revistaGetTodos_Json : revistaGetTodos_Json
} 