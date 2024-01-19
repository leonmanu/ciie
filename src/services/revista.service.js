const req = require('express/lib/request')
const revistaSheet =  require("../sheets/revista.sheet")

const get = async () => {
    registros = await revistaSheet.get()
    return registros
}

const revistaGetTodos_Json = async (req, res) => {
    registros = await revistaSheet.revistaGetTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ id: registro.id, nombre: registro.nombre, clave: registro.codigo})
    })
    
    return resultado
}

module.exports = {
    get,
    revistaGetTodos_Json : revistaGetTodos_Json
} 