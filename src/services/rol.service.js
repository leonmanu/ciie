const req = require('express/lib/request')
const rolSheet =  require("../sheets/rol.sheet")


const getTodos = async (req, res) => {
    resultado = await rolSheet.getTodos()
    return resultado
}

module.exports = {
    getTodos : getTodos
} 