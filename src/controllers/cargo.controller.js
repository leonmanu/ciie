const req = require('express/lib/request')
const cargoService =  require("../services/cargo.service")


const getCargosTodos = async (req, res) => {
    cargos = await cargoService.getCargosTodos()
    res.render("pages/cargo/cargoActuales", {cargos: cargos})
}

const getPorDocente = async (req, res) => {
    cargos = await cargoService.getPorDocente(req, res)
    res.render("pages/cargo/cargoActuales", {cargos: cargos})
}

module.exports = {
    getCargosTodos : getCargosTodos,
    getPorDocente:getPorDocente
} 