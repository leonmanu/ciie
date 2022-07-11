const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {putUno} = require('../controllers/estudianteCurso.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .post('/bajaFake',sessionMiddelware, putUno)//
    
module.exports = router
