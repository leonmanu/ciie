const req = require('express/lib/request')
const cursoSheet =  require("../sheets/curso.sheet")


const getTodos = async (req, res) => {
    console.log("Entro a cursoService")
    resultado = await cursoSheet.getTodos()
    return resultado
}

module.exports = {
    getTodos : getTodos
} 