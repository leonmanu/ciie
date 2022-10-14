const req = require('express/lib/request')
const cargoSheet =  require("../sheets/cargo.sheet")
const rolService = require('./rol.service')

const get = async () => {
    const resultado = await cargoSheet.get()
    return resultado
}

const getPorId = async (idCargo) => {
    const registros = await cargoSheet.get()
    const filtrados = await registros.filter(row => row.id == idCargo)
    resultado = filtrados[0]
    return resultado
}

//Dedería llamarse getTodosPorCurso o algo de Asignaturas
const getTodos = async (req, res) => {
    const registros = await cargoSheet.getTodos()
    const resultado = []
    const filtrados = registros.filter(row => row.curso == req.params.id)
    await filtrados.forEach( registro => {
        resultado.push({ id: registro.id, asignatura: registro.asignaturaNombre})
    })
    return resultado
}

const getPorDocenteCargo = async (docenteCargos) => {
    const cargo = await get()
    const filtrados = await cargo.filter(({ id }) => docenteCargos.some(({ cursoAsignatura }) => id == cursoAsignatura ))
    //console.log("getPorDocenteCargo: ", filtrados)
    return filtrados
}

const getCargoPorRol = async(idRol) => {
    const cargos = await cargoSheet.get()
    const filtrados = await cargos.filter(row => row.rol == idRol)
    //console.log("CargosFiltrados: ", filtrados)
    return filtrados
}


module.exports = {
    get:get,
    getTodos : getTodos,
    getPorId : getPorId,
    getCargoPorRol: getCargoPorRol,
    getPorDocenteCargo:getPorDocenteCargo,
} 