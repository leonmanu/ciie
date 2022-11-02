const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getPorDocente} = require('../controllers/docenteCargo.controller')
const {getCargoCursoPorDocente, getSiDisponible} = require('../controllers/docenteCargo.controller')
const {postDocenteCargo} = require('../controllers/docenteCargo.controller')
const {putBajaDocenteCargo_controller} = require('../controllers/docenteCargo.controller')
var registredMiddelware = require('../middelware/registred.middelware')

var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/', sessionMiddelware, registredMiddelware, (req,res) => {
        getPorDocente(req, res)
    } )
    .get('/curso', sessionMiddelware, (req,res) => {
        getCargoCursoPorDocente(req, res)
    } )
    .post('/alta', sessionMiddelware, postDocenteCargo)

    .get('/alta', sessionMiddelware, function(req,res){
        res.render("pages/cargo/cargoAlta")
    })
    .get('/:rowNumber/baja', sessionMiddelware, putBajaDocenteCargo_controller)
    .post('/siDisponible',sessionMiddelware, getSiDisponible)//


module.exports = router
