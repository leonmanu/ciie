const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {siExisteUsuario} = require('../controllers/usuario.controller')
const { get } = require('../controllers/campo.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/', get) //acá inica la app
    .get('/usuarioAlta', sessionMiddelware, function(req,res){
        console.log("appx ",req.user)
        res.render("pages/usuario/formularioAlta", {user: req.user})
    })
    .post('/login', passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
     }))
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

      global.base_dir = __dirname;
global.abs_path = function(path) {
  return base_dir + path;
}
global.include = function(file) {
  return require(abs_path('/' + file));
}

module.exports = router
