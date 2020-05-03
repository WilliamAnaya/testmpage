const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();
let env = process.env;
const Usuario = require('../models/User');
const jwt = require('jsonwebtoken');

passport.use(
    'login',
  new LocalStrategy(
      {
          usernameField: 'usuario',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
      }, async (req, usuario, password, cb) => {
          console.log(req);
          try {
              Usuario.findOne({
                  usuario: usuario
              }).then(resp => {
                  if(!resp){
                      return cb({status: 'error', message: 'Usuario incorrecto'});
                  }else{
                      bcrypt.compare(password, resp.password).then(result => {
                          if(resp){
                              const body = {
                                  id: resp.id,
                                  usuario: usuario,
                                  iat: Math.floor(Date.now() / 1000) - 30,
                                  exp: Math.floor(Date.now() / 1000) + (60 * 60)
                              };
                              const token = jwt.sign({user: body}, env.SECRET_KEY, {algorithm: 'HS512', expiresIn: 50000});
                              return cb(null, {
                                  status: 'success',
                                  message: 'Login success',
                                  token,
                                  user: resp
                              });
                          }else{
                              return cb(null, {
                                  status: 'error',
                                  message: 'Contraseña incorrecta'
                              });
                          }
                      });
                  }
              }).catch((err) => {
                    cb(err);
              })

          } catch (e) {
               return cb(e);
          }
      }
  ));

//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
    secretOrKey : env.SECRET_KEY,
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        return done({
            status: 'error',
            message: 'Token API invalido, usted no esta autorizado para acceder a este recurso',
            error: error
        });
    }
}));

