const productController = require("../controllers/Product");
const UserController = require("../controllers/User");
const passport = require('passport');

module.exports = (router) => {

    router.post('/login', UserController.login);

    router.post('/createUser', UserController.createUser);

    router.get('/usuario/:usuario', passport.authenticate('jwt', {session: false}), UserController.finduser);

    router.post('/producto', passport.authenticate('jwt', {session: false}), productController.createProduct);

    router.put('/producto/:id', passport.authenticate('jwt', {session: false}), productController.updateProduct);

    router.get('/productos', passport.authenticate('jwt', {session: false}), productController.getAllProducts);

    router.delete('/producto/:id', passport.authenticate('jwt', {session: false}), productController.deleteProduct);
};
