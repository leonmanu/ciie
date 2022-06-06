const req = require('express/lib/request')
const cursoSheet =  require("../sheets/curso.sheet")


const getTodos = async (req, res) => {
    resultado = await cursoSheet.getTodos()
    return resultado
}

module.exports = {
    getTodos : getTodos
} 