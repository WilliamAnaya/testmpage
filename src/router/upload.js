const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const body_parser_1 = require("body-parser");
var urlencodedParser = body_parser_1.urlencoded({ limit: '50mb', extended: false });

app.use(fileupload());

app.post('/upload', urlencodedParser, (req, res) => {
    if(!req.files){
        return res.status(400).json({
            status: 'error',
            message: 'No se ha enviado un archivo'
        });
    }
    let adjunto = req.files.adjunto;
    let nombreCortado = adjunto.name.split('.');
    let extension = nombreCortado[nombreCortado.length -1];

    let extensionesPermitidas = ['png', 'jpg', 'jpeg', 'svg'];

    if(extensionesPermitidas.indexOf(extension) < 0){
        return res.status(500).json({
            status: 'error',
            message: 'No se ha podido subir el archivo, extensión no permitita, solo se permiten archivos tipo Imagen',
        });
    }

    let nombreArchivo =  `${Date.now()}.${extension}`;

    adjunto.mv('src/uploads/'+ nombreArchivo, (err, resp) => {
        if(err){
            return res.status(500).json({
                status: 'error',
                message: 'No se ha podido subir el archivo',
                error: err
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Archivo subido exitosamente',
                filename: nombreArchivo,
                info: resp
            });
        }
    });
});

module.exports = app;
