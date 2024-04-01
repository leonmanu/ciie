const propuestaService = require('../services/propuesta.service')

const get = async () => {
    registros = await propuestaService.get()
    
    return registros
}

module.exports = {
    get,
} 