const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getEstudianteAsignatura} = require('../controllers/calificacion.controller')
const {getCursoYAsignatura_controller} = require('../controllers/calificacion.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/curso:curso/asignatura:asignatura', getCursoYAsignatura_controller)
    .post('/estudiantes', getEstudianteAsignatura)
    
module.exports = router