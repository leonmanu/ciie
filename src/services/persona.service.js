const req = require('express/lib/request')
const { head } = require('request')
const personaSheet =  require("../sheets/persona.sheet")

const getPersona = async () => { //este trae de la hoja estudiantes
    registros = await personaSheet.getTodo()
    return registros
}



module.exports = {
    getPersona:getPersona
} 