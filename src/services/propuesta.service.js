
const prouestaSheet =  require("../sheets/propuesta.sheet")

const get = async () => {
    registros = await prouestaSheet.get()
    return registros
}

const getPorCampoClave = async (clave) => {
    const registros = await get()
    const filtrados = await registros.filter(row => row.clave == clave)
    return filtrados[0]
}

module.exports = {
    get,
    getPorCampoClave,
} 