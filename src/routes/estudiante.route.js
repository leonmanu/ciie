const {Router} = require('express')
const passport = require('passport')
const router = Router()

const estudianteSchema = require('../models/estudiante.schema')

const { getRolTodo} = require('../controllers/rol.controller')
const {getPorCursoAsignatura, getPorId, put } = require('../controllers/estudiante.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .post('/', getRolTodo)
    .get('/curso/:curso/asignatura/:asignatura', getPorCursoAsignatura)
    .get('/:id/editar', getPorId)
    .post('/editar', put)
    .get('/todos')
    
module.exports = router