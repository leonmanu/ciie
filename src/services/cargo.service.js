const req = require('express/lib/request')
const cargoSheet =  require("../sheets/cargo.sheet")
const rolService = require('./rol.service')
const campoService = require('./campo.service')
const utilidadesService = require('./utilidades.service')
const docenteCargoService = require('./docenteCargo.service')

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

const getPorCampo = async (idCampo) => {
    const registros = await cargoSheet.get()
    const filtrados = await registros.filter(row => row.idCampo == idCampo)
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

const getPorDocente = async (user) => {
    const cargos = await get()
    const docenteCargos = await docenteCargoService.getPorDocente(user)
    //console.log("getPorDocenteCargo: ", docenteCargos)
    const filtrados = cargos.filter(({ id }) => docenteCargos.some(({ idCargo }) => id == idCargo ));

    return filtrados
}

const getPorDocenteCargo = async (docenteCargos) => {
    const cargo = await get()
    const filtrados = await cargo.filter(({ id }) => docenteCargos.some(({ idCargo }) => id == idCargo ))
    console.log("getPorDocenteCargo: ", filtrados)
    return filtrados
}

const getCargoPorRol = async(idRol) => {
    const cargos = await cargoSheet.get()
    const cargosFiltrados = await cargos.filter(row => row.idRol == idRol)
    const cargosJson = await utilidadesService.convertToJson(cargosFiltrados)
    const campo = await campoService.get()
    const campoJson = await utilidadesService.convertToJson(campo)
    const resultado = []
    
     cargosJson.forEach(cargo => {
         campoJson.forEach(campo => {
             if (cargo.idCampo == campo.id) {
                cargo.campo = campo.nombre + " - (" +campo.clave +")"
             }
         })
      });

    return cargosJson
}


module.exports = {
    get:get,
    getPorDocente,
    getTodos : getTodos,
    getPorId,
    getCargoPorRol: getCargoPorRol,
    getPorDocenteCargo:getPorDocenteCargo,
    getPorCampo,
} 