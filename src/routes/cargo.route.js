const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getPorDocente} = require('../controllers/cargo.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/:id', (req,res) => {
        getPorDocente(req, res)
    } )
    .get('/alta', function(req,res){
        res.render("pages/cargo/cargoAlta")
    })
    


module.exports = router
