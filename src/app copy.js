const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const inicialRouter = require('./routes/google.route')
const usuarioRouter = require('./routes/usuario.route')
const cursoRouter = require('./routes/curso.route')
const cargoRouter = require('./routes/cargo.route')

var sessionMiddelware = require('./middelware/session.middelware')
const usuarioController = require('./controllers/usuario.controller')
const LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const app = express()

app    
    //.use(express.static(path.join(__dirname, "public")))
    .use(express.static(__dirname + '/public'))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false ,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(inicialRouter)
    .use("/usuario",usuarioRouter)
    .use("/curso",cursoRouter)
    .use("/cargo",cargoRouter)

module.exports = app


authUser = async (request, accessToken, refreshToken, profile, done)  => {
    return done(null,profile) //corregir para que se rompa la sesión si no está registrado
}

passport.use(new GoogleStrategy({
    clientID:   "460276808063-s47r0nb77ceta3a7lumqqk1ojaq8gigi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  }, authUser
  
))

passport.serializeUser( (user, done) => {
    done(null, user)
 })
 passport.deserializeUser((user, done) => {
    done (null, user)
  })
passport.authenticate()



