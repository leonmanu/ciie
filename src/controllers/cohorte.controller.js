const req = require('express/lib/request')

const rolService = require('../services/rol.service')
const cohorteService = require('../services/cohorte.service')

const getUltimo = async () => {
    resultado = await cohorteService.getUltimo()
    console.log("getUltimo / registros --> " + resultado)
    res.send(resultado)
}

module.exports = {
    getUltimo
} 