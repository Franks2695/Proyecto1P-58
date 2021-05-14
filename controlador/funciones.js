const fs = require('fs');
var colors = require('colors')

let resultadosEstadisticas = [];

/* const guardarDatos = () => {
    let data = JSON.stringify(resultadosEstadisticas);
    fs.writeFile('./data/resultados.json', data, (err) => {
        if (err) throw new Error('No se pueden guardar los resultados', err)
    });
}

const leerDatos = () => {
    try {
        resultadosEstadisticas = require('../data/resultados.json');
    } catch (error) {
        resultadosEstadisticas = [];
        fs.readFile('./data/API.csv')
    }
} */

fs.watchFile('./data/API.csv')