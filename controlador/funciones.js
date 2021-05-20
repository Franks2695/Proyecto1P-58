const fs = require('fs');
const csv = require('csvtojson')
var colors = require('colors')

let js = [];

const consult = (path, code, year) => {
    let consult = [];
    let country = getData(path);
    num = 0;
    if (country != "Fatal Error") {
        let countr =
    }
}

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
        js = require('../data/resultados.json');
    } catch (error) {
        js = [];
    }
}

const getData = (file) => {
    try {
        infs = csv().fromFile(file);
        let data = [];
        let csv = JSON.parse(fs.readFileSync('./data/resultados.json', 'utf8'));
        for (let inf of infs) {
            inf = Object.values(inf);
            for (let codeCountry of csv) {
                if (inf[1] == codeCountry.CountryCode) {
                    data.push(inf)
                }
            }
        }
        return data;
    } catch (error) {
        error = "Fatal Error".bgRed
    }
}

const getCountry = (year, code) => {
    for (var i = 0; i < year.length; i++) {
        let value = Object.values(year[i]);
        if (value[1] == code) {
            return true;
        }
    }
}

const publicar = (path, country, year) => {
    consult(path, country, year).then((inf) => {
        if (inf.length > 0) {
            console.log('RESULTADOS');
        }
    });

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