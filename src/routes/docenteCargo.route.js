const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getPorDocente} = require('../controllers/docenteCargo.controller')
const {getCargoCursoPorDocente} = require('../controllers/docenteCargo.controller')
const {postDocenteCargo} = require('../controllers/docenteCargo.controller')
const {putBajaDocenteCargo_controller} = require('../controllers/docenteCargo.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/', sessionMiddelware, (req,res) => {
        getPorDocente(req, res)
    } )
    .get('/curso', sessionMiddelware, (req,res) => {
        getCargoCursoPorDocente(req, res)
    } )
    .post('/alta', postDocenteCargo)

    .get('/alta', function(req,res){
        res.render("pages/cargo/cargoAlta")
    })
    .get('/:rowNumber/baja', putBajaDocenteCargo_controller)
    


module.exports = router
