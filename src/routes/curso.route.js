const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {cursoGetTodo, getCursosTodos, getEstudiantes, getBoletines} = require('../controllers/curso.controller')
const {siExisteUsuario,post} = require('../controllers/usuario.controller')
const {getPorCurso, getPorIdCursoAjax} = require('../controllers/asignatura.controller')
const {getPorCursoAsignatura, getBoletinesPorCurso, getSemaforoPorCurso} = require('../controllers/calificacion.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/siExisteUsuario', function(req,res){
        siExisteUsuario(req,res)
    })
    .post('/', cursoGetTodo)
    .post('/form', post)
    .get("/logout", (req,res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          })
    })
    .get('/todos', getCursosTodos)
    .get('/:clave/estudiantes', getEstudiantes)
    .get('/:clave/boletines', getBoletinesPorCurso)
    .get('/:clave/semaforo', getSemaforoPorCurso)
    .get('/:clave/asignaturas', getPorCurso)
    .get('/:idCurso/asignaturasAjax', getPorIdCursoAjax)
    .get('/:clave/asignatura/:asignatura/calificacion', getPorCursoAsignatura)
    
module.exports = router
