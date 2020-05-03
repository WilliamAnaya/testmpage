const Product = require('../models/Product');
const product = new Product();

module.exports = {
    createProduct(req, res) {
        try {
            let params = req.body;
            product.nombre_producto = params.nombre_producto;
            product.nombre_categoria = params.nombre_categoria;
            product.precio_unitario = params.precio_unitario;
            product.iva = params.iva;
            product.sku = params.sku;
            product.inventario = params.inventario;

            product.save().then(resp => {
                res.status(200).json({
                    status: 'success',
                    message: 'Producto creado exitosamente',
                    details: resp
                });
            }).catch(err => {
                res.json({
                    status: 'error',
                    message: 'se ha presentato un error',
                    datails: err
                });
            })
        } catch (e) {
            res.json({
                status: 'error',
                message: 'se ha presentato un error',
                datails: e
            });
        }
    },

    getAllProducts(req, res) {
        Product.find((err, products) => {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    message: 'se ha presentato un error',
                    datails: err
                });
            } else {
                res.json({
                    status: 'success',
                    message: 'Productos listados exitosamente',
                    details: products
                });
            }
        })
    },

    updateProduct(req, res) {
        let id = req.params.id;
        let params = req.body;
        Product.findByIdAndUpdate(id, params, (err, producto) => {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    message: 'se ha presentato un error',
                    datails: err
                });
            } else {
                res.json({
                    status: 'success',
                    message: 'Producto actualizado exitosamente',
                    details: producto
                });
            }
        });
    },

    deleteProduct(req, res) {
        let id = req.params.id;
        Product.findByIdAndDelete(id, (err, product) => {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    message: 'se ha presentato un error',
                    datails: err
                });
            } else {
                res.json({
                    status: 'success',
                    message: 'Producto Eliminado exitosamente',
                    details: product
                });
            }
        })
    }
};



