const req = require('express/lib/request')
const cargoSheet =  require("../sheets/docenteCargo.sheet")
const utilidadesService = require('./utilidades.service')


const getCargosTodos = async (req, res) => {
    resultado = await cargoSheet.getCargosTodos()
    return resultado
}

const getPorDocente = async (req, res) => {//este es el que manda los cargos por docentes
    const registros = await cargoSheet.getCargosTodos()
    
    const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id && !row.fechaBaja)
        registros.map((registro)=>{
    })

    return resultados
}

const getPorDocenteCargoCurso = async (req, res) => {
    const registros = await cargoSheet.getCargosTodos()
    const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id && row.rol === "Pf")
        registros.map((registro)=>{
    })
    //console.log("REQ: ", resultados)
    return resultados
}

const postDocenteCargo = async (req, res) => {
    //habría que verificar si la combinación es válida (si ya existe o si puede solicitarla)
    //const fechaAlta = new Date().toISOString
    const objetoInterface = {
        id: req.body.cursoAsignatura+"_"+req.user.id,
        cursoAsignatura: req.body.cursoAsignatura,
        idGoogleUsuario: req.user.id,
        revista: req.body.revista,
        estado: 3,
    }
    objetoInterface.fechaAlta = new Date().toISOString()
    const resultado = await cargoSheet.postDocenteCargo(objetoInterface)
    return resultado
}

const getSiExiste = async (cursoAsignatura) => {
    const registros = await cargoSheet.getCargosTodos()
    const resultado = registros.filter(row => row.cursoAsignatura === cursoAsignatura && row.fechaBaja == '') //&& row.fechaBaja
    console.log("getSiExiste ",resultado," cursoAsignatura ",cursoAsignatura)
    return resultado
}

const putBajaDocenteCargo = async(rowNumber) => {
    const fechaBaja = new Date().toISOString()
    const resultado = await cargoSheet.putBajaDocenteCargo(rowNumber, fechaBaja)
    return resultado
}


module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente: getPorDocente,
    postDocenteCargo: postDocenteCargo,
    getPorDocenteCargoCurso: getPorDocenteCargoCurso,
    putBajaDocenteCargo: putBajaDocenteCargo,
    getSiExiste: getSiExiste
} 