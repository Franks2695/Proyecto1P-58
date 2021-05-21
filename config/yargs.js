const file = {
    demand: true,
    alias: 'f',
    desc: ' Permite establecer el path del archivo CSV que contiene los datos a analizar'
}

const country = {
    demand: true,
    alias: 'c',
    desc: ' Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3'
}

const year = {
    default: true,
    default: 2018,
    alias: 'y',
    desc: 'Permite especificar el año para el cual se requiere las estadísticas'
}

const out = {
    default: true,
    alias: 'o',
    desc: 'Establece el nombre del archivo donde se almacenará los resultados'
}

const argv = require("yargs")
    .command('publicar', 'Publicará las estadísticas en una página web básica', {
        file,
        country,
        year
    })
    .command('guardar', 'Muestra la lista de tareas', {
        file,
        country,
        year,
        out
    })
    .help()
    .argv;

module.exports = {
    argv
}