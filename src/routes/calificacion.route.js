const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getCursoYAsignatura_controller} = require('../controllers/calificacion.controller')
const {getEstudiantePorAsignatura_controller} = require('../controllers/calificacion.controller')
const {postCalificacion_controller} = require('../controllers/calificacion.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/curso:curso/asignatura:asignatura', getCursoYAsignatura_controller)//trae además a los estudiantes
    .get('/curso:curso/asignatura:asignatura/estudiantes', getEstudiantePorAsignatura_controller)
    .post('/post', postCalificacion_controller)
    
module.exports = router