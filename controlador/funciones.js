const fs = require('fs');
const csv = require('csvtojson')
var colors = require('colors')

let js = [];

const consult = (path, code, year) => {
    let consult = [];
    let country = getData(path);
    num = 0;
    if (country != "Fatal Error") {
        let countr = getCountry(country, code);
        if (countr == true) {
            if (year <= 2019 && year >= 1964) {
                getSuscription(country, code, year).then((suscriptionCountry) => {
                    getHalf(country, year, suscriptionCountry).then((half) => {
                        if (half > 0) {
                            let valor;
                            if (Number(half) > suscriptionCountry) {
                                valor = `Es menor. ${code}`
                            } else {
                                valor = `Es mayor`
                            }
                            let m = {
                                Codigo: code,
                                Anio: year,
                                Suscripcion: Number(suscriptionCountry),
                                MediaGlobal: Number(half),
                                Estado: valor,
                                key: "info"
                            }
                            consult.push(m);
                            getTopMax(country, year, suscriptionCountry).then((Max) => {
                                if (Max.length > 0) {
                                    for (let i of Max) {
                                        let M = {
                                            Pais: i.Pais,
                                            Codigo: i.Codigo,
                                            Suscripciones: i.Suscripciones,
                                            Descripcion: `Pais por Encima del valor de suscripcion de ${code}`,
                                            key: "tp5Max"
                                        }
                                        consult.push(M);
                                    }
                                }
                            });
                            getTopMin(country, year, suscriptionCountry).then((Min) => {
                                if (Max.length > 0) {
                                    for (let i of Min) {
                                        let Mi = {
                                            Pais: i.Pais,
                                            Codigo: i.Codigo,
                                            Suscripciones: i.Suscripciones,
                                            Descripcion: `Pais por Encima del valor de suscripcion de ${code}`,
                                            key: "tp5Min"
                                        }
                                        consult.push(Mi);
                                    }
                                }
                            });
                            getTop(country, year).then((Top) => {
                                for (let i of Top) {
                                    let Top = {
                                        Pais: i.Pais,
                                        Suscripciones: i.Suscripciones,
                                        Descripcion: `Top 5 de paises con sucripciones mas altas en el año ${year}`,
                                        key: "tp5"
                                    }
                                    consult.push(Top)
                                }
                                return consult;
                            });
                        }
                    });
                });
            } else {
                console.log(`No existe ${year}`).red;
            }
        } else {
            console.log(`No existe ${code}`).red;
        }
    } else {
        console.log(`No existe ${path}`).red;
    }
    return consult;
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

const getSuscription = (country, code, year) => {
    for (var i = 0; i < year.length; i++) {
        let value = Object.values(country[i]);
        if (value[1] == code) {
            suscription = value[year - 1956];
            return suscription;
        }
    }
}

const getHalf = (country, year) => {
    let sum = 0;
    let prom = 0;
    for (var i = 0; i < year.length; i++) {
        let value = Object.values(year[i]);
        let number = Number(value[year - 1956]);
        if (number > 0) {
            prom++;
            sum = sum + number;
        }
    }
    if (prom > 0) {
        prom = (sum / prom).toFixed(3)
        return prom;
    } else {
        return 0;
    }
}

const getTop = (country, year) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (sus > 0) {
            let datas = {
                Country: data[0],
                Code: data[1],
                Suscriptions: sus
            }
            top.push(datas)
        }
        num = suscription
        top.sort(function(a, b) {
            return b.Suscriptions - a.Suscriptions
        });
        top = top.slice(0, 5)
    }
    return top
}

const getTopMax = (country, year, susCountry) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (sus > susCountry) {
            let datas = {
                Country: data[0],
                Code: data[1],
                Suscriptions: sus
            }
            top.push(datas)
        }
        top.sort(function(a, b) {
            return a.Suscriptions - b.Suscriptions
        });
        top = top.slice(0, 5)
    }
    return top
}

const getTopMin = (country, year, susCountry) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (Number(sus) > 0) {
            if (suscription < susCountry) {
                let datas = {
                    Country: data[0],
                    Code: data[1],
                    Suscriptions: sus
                }
                top.push(datas)
            }
            top.sort(function(a, b) {
                return b.Suscriptions - a.Suscriptions
            });
            top = top.slice(0, 5)
        }
        return top
    }
}

const publicar = (path, country, year) => {
    consult(path, country, year).then((inf) => {
        if (inf.length > 0) {
            console.log('RESULTADOS');
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
    consult,
    pagina
}