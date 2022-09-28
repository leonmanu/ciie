const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {putUno, post} = require('../controllers/estudianteCurso.controller')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .post('/alta',sessionMiddelware, post)//
    .post('/bajaFake',sessionMiddelware, putUno)//
     
module.exports = router
