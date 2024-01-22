const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { get, getPorCapacitacion, putArray } = require('../controllers/cursante.controller')
var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/', get)
    .get('/:campoClave', getPorCapacitacion)
    .put('/put', putArray)

module.exports = router 