const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { getPorCampoCohorte, post } = require('../controllers/encuentroFecha.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/getAjax', getPorCampoCohorte)
    .post('/get', getPorCampoCohorte)
    .post('/post', post)
    
module.exports = router