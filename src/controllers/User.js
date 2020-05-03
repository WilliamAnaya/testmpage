const Usuario = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passport = require('passport');


module.exports = {

    greeting(req, res) {
        res.send({greeting: "Hello"})
    },

    login(req, res, next) {
        passport.authenticate('login', {passReqToCallback: true}, (err, resp) => {
            if (err) {
                res.status(200).json(
                    err
                );
            } else {
                res.json(resp);
            }
        })(req, res, next)
    },

    finduser(req, res) {
        let user = req.params.usuario;
        Usuario.findOne({
            usuario: user
        }).then((resp) => {
            res.json({
                status: 'success',
                message: 'Usuario listado exitosamente',
                details: resp
            })
        }).catch((err) => {
            res.status(200).json({
                status: 'error',
                message: 'se ha presentato un error',
                datails: err
            });
        })
    },

    createUser(req, res) {
        let params = req.body;
        let passwordhash = bcrypt.hashSync(params.password, saltRounds);
        let usuario = new Usuario({
            usuario: params.usuario,
            role: params.role,
            password: passwordhash
        });
        usuario.save((err, resp) => {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    message: 'se ha presentato un error',
                    datails: err
                });
            }
                res.json({
                    status: 'success',
                    message: 'Usuario creado exitosamente',
                    details: resp
                })
        });
    }
};



