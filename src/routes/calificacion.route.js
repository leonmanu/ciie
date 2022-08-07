const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {
    getCursoYAsignatura_controller,
    getCursoAsignaturaInforme,
    getPorDni
} = require('../controllers/calificacion.controller')
const {getEstudiantePorAsignatura_controller} = require('../controllers/calificacion.controller')
const {postCalificacion_controller} = require('../controllers/calificacion.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/curso:curso/asignatura:asignatura',sessionMiddelware, getCursoYAsignatura_controller)//trae además a los estudiantes
    .get('/curso:curso/asignatura:asignatura/estudiantes', getEstudiantePorAsignatura_controller)
    .get('/curso:curso/asignatura:asignatura/informe', getCursoAsignaturaInforme)
    .post('/post', postCalificacion_controller)
    .get('/estudiante/valoracion', getPorDni)
    
module.exports = router