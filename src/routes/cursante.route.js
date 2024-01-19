const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { get } = require('../controllers/cursante.controller')
var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/', get)

module.exports = router 