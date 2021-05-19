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
    convertir_guardar();

}

const publicar = () => {
    leerDatos();

    let est = {
        country: true,
        year: true
    }

    let i = js.filter(n => n.field5 === "1960")
    console.log(i);

    /*  if (index1, index2 >= 0) {
         
     } */

}

module.exports = {
    convertir_guardar,
    publicar,
    ej
}