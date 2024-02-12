const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { get, getPorCapacitacion, getPorCapacitacionCursantesDatos, putArray, getListaAsistenciaTodas } = require('../controllers/cursante.controller')
var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/', get)
    .get('/listaAsistencia', getListaAsistenciaTodas)
    .get('/:campoClave', getPorCapacitacion)
    .get('/:campoClave/cursantesDatos', getPorCapacitacionCursantesDatos)
    .put('/put', putArray)

module.exports = router 