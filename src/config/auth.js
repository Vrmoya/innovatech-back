require("dotenv").config();
const { REDIRECT_HOST, PORT } = process.env;
const baseURL = `http://${REDIRECT_HOST}:${PORT}`
const passport = require('passport');
const { User } = require("../db.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: baseURL + "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log('Google authentication strategy called');
    console.log('Profile:', profile); // Agregar este registro para verificar los datos de perfil recibidos de Google
    User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      }
    })
      .then(([user, created]) => {
        console.log('User found or created:', user);
        done(null, user);
      })
      .catch(err => {
        console.error('Error in Google authentication strategy:', err);
        return done(err);
      });
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: baseURL + "/auth/github/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log('GitHub authentication strategy called');
    console.log('Profile:', profile); // Agregar este registro para verificar los datos de perfil recibidos de GitHub
    User.findOrCreate({
      where: { githubId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
        image: profile.photos[0].value
      }
    })
      .then(([user, created]) => {
        console.log('User found or created:', user);
        done(null, user);
      })
      .catch(err => {
        console.error('Error in GitHub authentication strategy:', err);
        return done(err);
      });
  }
));

// Personalización de la serialización de usuario
passport.serializeUser((user, done) => {
  // Aquí defines qué información del usuario se almacenará en la sesión
  // Por ejemplo, podrías almacenar solo el ID del usuario
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Aquí recuperas el usuario de la base de datos utilizando el ID almacenado en la sesión
  User.findByPk(id)
    .then(user => {
      done(null, user); // Pasar el usuario recuperado a través de done
    })
    .catch(err => {
      done(err); // Pasar cualquier error encontrado a través de done
    });
});

module.exports = {
  secret: process.env.AUTH_SECRET || "veremos",
  expires: process.env.AUTH_EXPIRES || "24h",
  rounds: process.env.AUTH_ROUNDS || 10,
  passport: passport
}
