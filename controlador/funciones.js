const fs = require('fs');
const csv = require('csvtojson')
var colors = require('colors')

let js = [];

const convertir_guardar = () => {
    csv().fromFile('./data/API.csv')
        .then((json) => {
            js = json;
            let js1 = JSON.stringify(js);
            fs.writeFile('./data/datos.json', js1, (err) => {
                if (err) throw new Error('No se pueden guardar los resultados', err)
            });
        });
}

const leerDatos = () => {
    try {
        js = require('../data/datos.json');
    } catch (error) {
        js = [];
    }
}

const ej = () => {
    te = require('../data/resultados.json')
        //CONEXIÓN AL CSV

    'use strict'

    fs.readFile('API.csv', 'utf8', function(err, data) {
        var dataArray = data.split(/\r?\n/);
        console.log(dataArray);
    });

    for (var i = 0; i < te.length; i++) {
        nom = te[i].CountryCode;
    }

    /* for (var j = 0; j < te.length; j++)
        if (nom === API[1]) {
            console.log('Hola');
        } */
}

const publicar = () => {
    leerDatos();

    let est = {
        country: true,
        year: true
    }
    let n = "Country Name"
    let i = js.filter(n => n.Data_Source === "ABW")
    console.log(i);

    /*  if (index1, index2 >= 0) {
         
     } */

}

const pagina = () => {
    const http = require('http');

    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello Worlddddd');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

module.exports = {
    convertir_guardar,
    publicar,
    ej,
    pagina
}