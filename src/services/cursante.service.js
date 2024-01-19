const req = require('express/lib/request')
const capacitacionSheet =  require("../sheets/cursante.sheet")
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await capacitacionSheet.get()
    
    return registros
}

module.exports = {
    get: get
} 