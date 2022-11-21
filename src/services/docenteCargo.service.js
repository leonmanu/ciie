const req = require('express/lib/request')
const docenteCargoSheet = require('../sheets/docenteCargo.sheet')
const cargoSheet =  require("../sheets/docenteCargo.sheet")
const cargoService = require('./cargo.service')
const cursoService = require('./curso.service')
const cursoAsignaturaService = require('./cursoAsignatura.service')
const rolService = require('./rol.service')
const usuarioService = require('./usuario.service')
const utilidadesService = require('./utilidades.service')


const get = async () => {
    resultados = await docenteCargoSheet.get()
    return resultados
}

const getCargosTodos = async (req, res) => {
    resultado = await cargoSheet.getCargosTodos()
    return resultado
}

const getPorDocente = async (req) => {//este es el que manda los cargos por docentes
    const registros = await cargoSheet.get()
    const filtrados = registros.filter(row => row.idGoogleUsuario === req.user.id && !row.fechaBaja)
    
    return filtrados
}

const getPorDocenteCargoCurso = async (req, res) => {
    const registros = await cargoSheet.getCargosTodos()
    const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id && row.rol === "Pf")
        registros.map((registro)=>{
    })
    //console.log("REQ: ", resultados)
    return resultados
}

const postDocenteCargo = async (req) => {
    //habría que verificar si la combinación es válida (si ya existe o si puede solicitarla)
    //const fechaAlta = new Date().toISOString

    const cargo = await cargoService.getPorId(req.body.cursoAsignatura)
    console.log("Cargo::", cargo)
    if (cargo) {
        console.log('El cargo existe ')
    }
    else{
        
        console.log("cargo no encontrado")
    }

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
    
    const resultado = registros.filter(row => row.cursoAsignatura === cursoAsignatura && !row.fechaBaja) //&& row.fechaBaja
    console.log("getSiExiste ",resultado," cursoAsignatura ",cursoAsignatura)
    return resultado
}

const getSiDisponible = async (cargo) => {
    console.log("idCargo: ", cargo) 
    // const cursoAsignatura = await cursoAsignaturaService.get()
    // const cursoAsignaturaFiltrado = cursoAsignatura.filter(row.asignatura == cargo)
    // console.log("cursoAsignatrua:: ", cursoAsignaturaFiltrado)
    
    const docenteCargos = await get()
    const filtrados = await docenteCargos.filter(row => !row.fechaBaja && row.cursoAsignatura == cargo.idCargo) //&& row.fechaBaja

    console.log("resultados:: ", filtrados)
    let resultadoFinal
    try {
        console.log("getSiExiste ",filtrados[0].idGoogleUsuario)
        const idGoogle = filtrados[0].idGoogleUsuario
        console.log("idGoogle: ", idGoogle)
        const usuario = await usuarioService.getPorIdGoogle(idGoogle)
        console.log("Usuario: ", usuario)
        resultadoFinal = usuario.apellido+", "+usuario.nombre
    } catch (error) {
        resultadoFinal = 'Disponible'
        console.log("ERROR! ", error)
    }
    
    return resultadoFinal
}

const putBajaDocenteCargo = async(id, userId) => {
    const fechaBaja = new Date().toISOString()
    const docenteCargos = await docenteCargoSheet.get()
    const docenteCargo = await docenteCargos.filter(row => row.cursoAsignatura == id && row.idGoogleUsuario == userId && row.fechaBaja == null)
    console.log("DocenteCargos", docenteCargo)
    docenteCargo[0].fechaBaja = fechaBaja
    docenteCargo[0].save()
    //const resultado = await cargoSheet.putBajaDocenteCargo(rowNumber, fechaBaja)
    return docenteCargo[0]
}


module.exports = {
    get:get,
    getCargosTodos : getCargosTodos,
    getPorDocente: getPorDocente,
    postDocenteCargo: postDocenteCargo,
    getPorDocenteCargoCurso: getPorDocenteCargoCurso,
    putBajaDocenteCargo: putBajaDocenteCargo,
    getSiExiste: getSiExiste,
    getSiDisponible: getSiDisponible,
} 