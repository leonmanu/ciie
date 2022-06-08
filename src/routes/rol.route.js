const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { getRolTodo} = require('../controllers/rol.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .post('/', getRolTodo)
    
module.exports = router