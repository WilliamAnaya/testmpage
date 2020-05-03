const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = new Schema({
    usuario: {
        type: String,
        unique: true,
        required: [true, 'EL nombre de usuario es requerido']
    },
    role: {
        type: String,
        default: 'USER_ROL'
    },
    password: {
        type: String,
        required: [true, 'la contraseña es requerida']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);
