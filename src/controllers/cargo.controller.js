const req = require('express/lib/request')
const cargoService = require('../services/cargo.service')
const rolService = require('../services/rol.service')
//const cargoSheet = require('../sheets/cargo.sheet')

const getTodos = async (req, res) => {
    registros = await cargoService.getTodos(req, res)
    res.send(registros)
}

const getCargoPorRol = async (req, res) => {
    const rolCargos = []
    const idRol = req.body.idRol
    const rol = await rolService.getPorId(idRol)
    const cargos = await cargoService.getCargoPorRol(idRol)
    // await cargos.forEach(cargo => {
    //     rolCargos.push({rol: rol, cargo: cargo})
    // });
    console.log("getCargoPorRol: ",cargos)
    res.send(cargos)
}

module.exports = {
    getTodos : getTodos,
    getCargoPorRol: getCargoPorRol
} 