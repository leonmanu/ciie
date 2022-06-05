const req = require('express/lib/request')
const cargoSheet =  require("../sheets/docenteCargo.sheet")


const getCargosTodos = async (req, res) => {
    resultado = await cargoSheet.getCargosTodos()
    return resultado
}

const getPorDocente = async (req, res) => {
    const registros = await cargoSheet.getCargosTodos()
    
    const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id)
        registros.map((registro)=>{
    })
    console.log("REQ: ", req.user.id)
    return resultados
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente: getPorDocente
} 