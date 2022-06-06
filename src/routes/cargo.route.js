const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { getTodos} = require('../controllers/cargo.controller')
const cargoController = require('../controllers/cargo.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/:selector', async (req, res) => {
        console.log("CargoRouter", req.params)
        const resultados = await cargoController.getTodos()
        //getTodos(req, res)
        //console.log("cargoRouter: resultados -> ",resultados)
        res.send(resultados)
        //return resultados
    } )
    .get('/alta', function(req,res){
        res.render("pages/cargo/cargoAlta")
    })
    


module.exports = router