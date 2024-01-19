const req = require('express/lib/request')
const cursanteService = require('../services/cursante.service')

const get = async (req,res) => {
    registros = await cursanteService.get()
    console.log("controller.CURSANTES:: ", registros)
    res.render("pages/cursante/asistencia", {cursante: registros, user: req.user})
}

module.exports = {
    get
}