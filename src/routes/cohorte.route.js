const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { getConFechaPorClaveAjax} = require('../controllers/cohorte.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .post('/', getConFechaPorClaveAjax)
    
module.exports = router