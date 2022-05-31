const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const inicilaRouter = require('./routes/google.route')
const usuarioRouter = require('./routes/usuario.route')

var sessionMiddelware = require('./middelware/session.middelware')
const usuarioController = require('./controllers/usuario.controller')
const LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const app = express()

app    
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
    .use(inicilaRouter)
    .use("/usuario",usuarioRouter)

module.exports = app

authUser = async (request, accessToken, refreshToken, profile, done)  => {
//     await usuarioController.getOneByEmail({email: profile.email}).then((currentUser) => {
//        if (currentUser.email == profile.email) {
//            //currentUser = profile
//            console.log("done: ",done)
//            return done(null,profile)
//        } else {        
//            //usuarioController.post({usuario: profile})
//            //console.log("NOuser:::", result)
//            done(null,profile)
//            res.redirect('views/pages/usuario/formularioAlta')
//        }
//    })
    return done(null,profile)
}

passport.use(new GoogleStrategy({
    clientID:   "460276808063-s47r0nb77ceta3a7lumqqk1ojaq8gigi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  }, authUser
  
))

passport.serializeUser( (user, done) => {
    // console.log(`\n--------> Serialize User:`)
    //console.log("serializeUser",user)
    done(null, user)
 })
 passport.deserializeUser((user, done) => {
    // console.log("\n--------- Deserialized User:")
    //console.log("deserializeUser",user)
    done (null, user)
  })
passport.authenticate()



