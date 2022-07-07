const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {cursoGetTodo, getCursosTodos} = require('../controllers/curso.controller')
const {siExisteUsuario,post} = require('../controllers/usuario.controller')
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
    .get(':clave/estudiantes', getCursosTodos)
    


module.exports = router
