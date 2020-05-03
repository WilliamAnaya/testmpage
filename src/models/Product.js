const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Product = new Schema({
    nombre_producto: {
        type: String,
        unique: true,
        required: [true, 'EL nombre del producto es requerido']
    },
    nombre_categoria: {
        type: String,
        required: true
    },
    precio_unitario: {
        type: String,
        required: [true, 'la contraseña es requerida']
    },
    iva: {
        type: Number,
        required: [true, 'el valor del iva es requerido']
    },
    sku: {
        type: String,
        required: [true, 'El Sku es Requerido']
    },
    inventario: {
        type: Number,
        required: [true, 'El número de invetario es requerido']
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', Product);
