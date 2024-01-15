const req = require('express/lib/request')
const capacitacionService = require('../services/capacitacion.service')

const get = async (req,res) => {
    registros = await capacitacionService.get()
    console.log("controller.capacitacion ,,,", registros)
    res.render("pages/capacitacion/capacitacionList", {capacitacion: registros, user: req.user})
}

module.exports = {
    get
}