const conn = require("../src/db/index");
const app = require("../app");
const request = require("supertest");
const expect = require("chai").expect;

describe('Express app', () => {

    before((done) => {
        conn.connect().then(() => {
            done();
        }).catch((err) => {
            done(err);
        })
    });

    after((done) => {
        conn.disconnet().then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it("Handler POST request /login", done => {
       request(app)
            .post('/login')
           .send({
               usuario: 'williamanaya',
               password: 'mpagetest2020.'
           })
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('token');
                expect(body).to.contain.property('user');
                done();
            });
    });

    it("Handler POST request /createUser", done => {
        request(app)
            .post('/createUser')
            .send({
                usuario: 'testUnit',
                password: 'testUnit2020',
                role: 'USER_ROL'
            })
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });

    it("Handler GET request /usuario/id", done => {
        request(app)
            .get('/usuario/williamanaya')
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });

    it("Handler POST request /producto", done => {
        request(app)
            .post('/producto')
            .send({
                nombre_producto: 'testUnit Product',
                nombre_categoria: 'testUnit Category',
                precio_unitario: '18000',
                iva: '16',
                sku: 'TestUnit',
                inventario: '1000',
            })
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });

    it("Handler PUT request /productos/:id", done => {
        request(app)
            .put('/producto/5eadbcca1d93f61180450270')
            .send({
                nombre_producto: 'testUnit Product Update',
                nombre_categoria: 'testUnit Category Update',
                precio_unitario: '1800',
                iva: '17',
                sku: 'TestUnit Update',
                inventario: '100'
            })
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });

    it("Handler GET request /productos", done => {
        request(app)
            .get('/productos')
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });

    it("Handler DELETE request /producto/:id", done => {
        request(app)
            .delete('/producto/5eaeda2f084c831d782b21c9')
            .end((err, response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('details');
                done();
            });
    });


});
