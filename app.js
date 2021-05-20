const fs = require('fs');
const { argv } = require('./config/yargs');
const { convertir, publicar, ej, pagina } = require('./controlador/funciones');

let comando = argv._[0];

switch (comando) {
    case 'publicar':
        break;
    case 'guardar':
        console.log('Mostrando la lista de tareas...');
        ej();
        break;
    default:
        console.log('Comando no válido');
}