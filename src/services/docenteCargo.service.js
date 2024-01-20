const req = require('express/lib/request')
const docenteCargoSheet = require('../sheets/docenteCargo.sheet')
const cargoSheet =  require("../sheets/docenteCargo.sheet")

const cursoService = require('./curso.service')
const cursoAsignaturaService = require('./cursoAsignatura.service')
const rolService = require('./rol.service')
const usuarioService = require('./usuario.service')
const utilidadesService = require('./utilidades.service')
const { v4: uuidv4 } = require('uuid');
const cargoService = require('./cargo.service')


const get = async () => {
    resultados = await docenteCargoSheet.get()
    return resultados
}

const getCargosTodos = async (req, res) => {
    resultado = await cargoSheet.getCargosTodos()
    return resultado
}

const getPorDocente = async (user) => {//este es el que manda los cargos por docentes
    const usuario = await usuarioService.getPorIdGoogle(user.id)
    const docenteCargos = await get()
    const filtrados = await docenteCargos.filter(row => row.idUsuario == usuario.id)
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

const postDocenteCargo = async (objeto, user) => {
    //habría que verificar si la combinación es válida (si ya existe o si puede solicitarla)
    //const fechaAlta = new Date().toISOString
    //const usuario = usuarioService.getPorIdGoogle(user.id)
    const usuario = await usuarioService.getPorIdGoogle(user.id)
    console.log("USUARIO encontrado::: (id)--->  " + usuario.id)
    let nuevoId = uuidv4()
    const objetoInterface = {
        id: nuevoId,
        idUsuario: usuario.id,
        idCargo: objeto.cargo,
        idRevista: objeto.revista,
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
    
    const docenteCargos = await get()
    const filtrados = await docenteCargos.filter(row => !row.fechaBaja && row.idCargo == cargo.idCargo) //&& row.fechaBaja
    const cargoFiltrado = filtrados[0]
    let resultadoFinal
    try {
        console.log("getSiExiste ",cargoFiltrado.idUsuario)
        const idUsuario = cargoFiltrado.idUsuario
        console.log("idGoogle: ", idUsuario)
        const usuario = await usuarioService.getPorId(idUsuario)
        console.log("Usuario: ", usuario)
        resultadoFinal = usuario.email
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