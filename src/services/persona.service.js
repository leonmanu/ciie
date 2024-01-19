const req = require('express/lib/request')
const { head } = require('request')
const personaSheet =  require("../sheets/persona.sheet")


const get = async () => { //este trae de la hoja persona
    registros = await personaSheet.getTodo()
    return registros
}

const getPorCuil = async (cuil) => { //este trae de la hoja persona
    registros = await personaSheet.get()
    const filtrados = await registros.filter(row => row.cuil == cuil)
    resultado = filtrados[0]
    return registros
}

async function post(objeto){
    const registro =  await personaSheet.post(objeto)

    return registro
}


module.exports = {
    get,
    getPorCuil,
    post
} 