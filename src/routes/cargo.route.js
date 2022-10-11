const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { getTodos} = require('../controllers/cargo.controller')
const { getCargoPorRol } = require('../controllers/cargo.controller')
const cargoController = require('../controllers/cargo.controller')
var sessionMiddelware = require('../middelware/session.middelware')



router
    .get('/:id', getTodos)
    .post('/rol', getCargoPorRol)//ajax
    .get('/alta', function(req,res){
        res.render("pages/cargo/cargoAlta")
    })
    


module.exports = router