const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");
const cors = require('cors');
const publicPath = path.resolve(__dirname, './src/public');
const rutas = require("./src/router/router");
const db = require("./src/db/index");
const passport = require('passport');
require('./src/config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(cors());
rutas(app);

db.connect().then(resp => {
    console.log('Conectado a la base de datos');
}).catch((err) => {
    console.log("No se ha podido conectar a la base de datos", err);
});
app.use( express.static(publicPath));

module.exports = app;
