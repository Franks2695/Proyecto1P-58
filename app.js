const fs = require('fs');
const { argv } = require('./config/yargs');

let comando = argv._[0];

switch (comando) {
    case 'publicar':
        console.log('Creando una tarea...');
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'guardar':
        console.log('Mostrando la lista de tareas...');
        listar();
        break;
    default:
        console.log('Comando no válido');
}

fs.watchFile('./data/API.csv')