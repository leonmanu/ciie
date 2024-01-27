// passport.js

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const authUser = async (request, accessToken, refreshToken, profile, done) => {

    const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    console.log("Passport -> authUser, Email:", userEmail);

    return done(null, profile);
};


// Configuración de la estrategia de Google
passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production'
        ? 'https://ciie069.onrender.com/auth/google/callback'
        : 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
}, 
authUser));

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Exporta el objeto Passport configurado
module.exports = passport;
