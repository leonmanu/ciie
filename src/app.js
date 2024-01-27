require("dotenv").config()

const express = require('express')

const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const passport = require('passport')
const inicialRouter = require('./routes/google.route')
const usuarioRouter = require('./routes/usuario.route')
const docenteCargoRouter = require('./routes/docenteCargo.route')
const cargoRouter = require('./routes/cargo.route')
const capacitacionRouter = require('./routes/capacitacion.route')
const cursanteRouter = require('./routes/cursante.route')
const rolRouter = require('./routes/rol.route')
const revistaRouter = require('./routes/revista.route')
const encuentroFechaRouter = require('./routes/encuentroFecha.route')

var sessionMiddelware = require('./middelware/session.middelware')
const usuarioController = require('./controllers/usuario.controller')
const LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;



const app = express()
var hour = 36000000;
app    
    .use(express.static(__dirname + '/public'))
    .set("views", path.join(__dirname, "/views"))
    .set("view engine", "ejs")
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(session({
      cookie: {
        expires: new Date(Date.now() + hour)
      },
      secret: "secret",
      resave: false ,
      saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(inicialRouter)
    .use("/usuario", usuarioRouter)
    .use("/docente/cargo", docenteCargoRouter)
    .use("/cargo", cargoRouter)
    .use("/cursante", cursanteRouter)
    .use("/capacitacion", capacitacionRouter)
    .use("/rol", rolRouter)
    .use("/revista", revistaRouter)
    .use("/encuentroFecha", encuentroFechaRouter)

module.exports = app


// mongo db conexión

authUser = async (request, accessToken, refreshToken, profile, done)  => {
    return done(null,profile) //corregir para que se rompa la sesión si no está registrado
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://ciie069.onrender.com/auth/google/callback'
          : 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
)

passport.serializeUser( (user, done) => {
    done(null, user)
 })

 passport.deserializeUser((user, done) => {
    done (null, user)
 })
passport.authenticate()



