const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {revistaGetTodo } = require('../controllers/revista.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .post('/', revistaGetTodo)
    
module.exports = router