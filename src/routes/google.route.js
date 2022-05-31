const {Router} = require('express')
const passport = require('passport')
const router = Router()
const {get, pintarForm, post, getInforme} = require('../controllers/estudiante.controller')
const {getEstudiantes} = require('../controllers/curso.controller')
const {siExisteUsuario} = require('../controllers/usuario.controller')
const { getOne } = require('../sheets/estudiante.sheet')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/usuarioAlta', sessionMiddelware, function(req,res){
        console.log("appx ",req.user._json)
        res.render("pages/usuario/formularioAlta", {user: req.user})
    })
    .get('/prueba',sessionMiddelware, function(req,res){
        console.log("appx ",req.user.displayName)
        res.render("pages/cualquiera",  {user: req.user})
    })
    .get('/', get)
    .post('/login', passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
     }))
    .get('/estudiante/:id', getOne)
    .get('/app/informe',sessionMiddelware, function(req,res,next){
        res.redirect(getInforme)
    })
    .get('/form', pintarForm)
    .post('/form', post)
    .get('/curso/:id', getEstudiantes)
    .get('/auth/google', 
            passport.authenticate('google', { scope: [ 'email', 'profile' ]
        }))
    .get('/auth/google/callback',
        passport.authenticate('google', {
        successRedirect: '/usuario/siExisteUsuario',
        failureRedirect: '/login'
    }))
    .get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
      })


module.exports = router
