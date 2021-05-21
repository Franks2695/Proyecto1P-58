const fs = require('fs');
const csv = require('csvtojson')
var colors = require('colors')

let js = [];

const consult = async(path, code, year) => {
    let consulta = [];
    let country = await getData(path);
    if (country != "Fatal Error") {
        let countr = await getCountry(country, code);
        if (countr == true) {
            if (year <= 2019 && year >= 1964) {
                getSuscription(country, code, year).then((suscriptionCountry) => {
                    getHalf(country, year, suscriptionCountry).then((half) => {
                        if (half > 0) {
                            let value;
                            if (Number(half) > suscriptionCountry) {
                                value = `El valor de las suscripciones de ${code} es MENOR a la media mundial`
                            } else {
                                value = `El valor de las suscripciones de ${code} es MAYOR a la media mundial`
                            }
                            let m = {
                                Global_Media: Number(half),
                                Year: year,
                                Code: code,
                                Suscription: Number(suscriptionCountry),
                                Value: value,
                                Reference: 1
                            }
                            consulta.push(m);
                            getTopMax(country, year, suscriptionCountry).then((Max) => {
                                if (Max.length > 0) {
                                    for (let i of Max) {
                                        let M = {
                                            Country: i.Country,
                                            Code: i.Code,
                                            Suscriptions: i.Suscriptions,
                                            Description: `Pais por Encima del valor de suscripcion de ${code}`,
                                            Reference: 2
                                        }
                                        consulta.push(M);
                                    }
                                }
                            })
                            getTopMin(country, year, suscriptionCountry).then((Min) => {
                                if (Min.length > 0) {
                                    for (let i of Min) {
                                        let Mi = {
                                            Pais: i.Pais,
                                            Codigo: i.Codigo,
                                            Suscripciones: i.Suscripciones,
                                            Descripcion: `Pais por Encima del valor de suscripcion de ${code}`,
                                            key: "tp5Min"
                                        }
                                        consulta.push(Mi);
                                    }
                                }
                            })
                            getTop(country, year).then((Top) => {
                                for (let i of Top) {
                                    let Top = {
                                        Pais: i.Pais,
                                        Suscripciones: i.Suscripciones,
                                        Descripcion: `Top 5 de paises con sucripciones mas altas en el año ${year}`,
                                        key: "tp5"
                                    }
                                    consulta.push(Top)
                                }
                                return consulta;
                            });
                        }
                    });
                });
            } else {
                console.log(`No existe ${year}`.red);
            }
        } else {
            console.log(`No existe ${code}`.red);
        }
    } else {
        console.log(`No existe ${path}`.red);
    }
    return await consulta;
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

const saveData = async(out) => {
    let data = JSON.stringify(js);
    fs.writeFileSync(`./data/${out}.json`, data, (err, data) => {
        if (err) throw new Error('No se puede guardar la data', err);
    });
}

const leerDatos = async(out) => {
    try {
        js = require(`../data/${out}.json`);
    } catch (error) {
        js = []
    }
}

const getData = async(file) => {
    try {
        const infs = await csv().fromFile(file);
        let data = [];
        var code = JSON.parse(fs.readFileSync('./data/country.json', 'utf8'));
        for (let inf of infs) {
            inf = Object.values(inf);
            for (let c of code) {
                if (inf[1] == c.countryCode) {
                    data.push(inf)
                }
            }
        }
        return data;
    } catch (e) {
        e = "Fatal Error"
        return e
    }
}

const getCountry = async(country, code) => {
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        if (value[1] == code) {
            return true;
        }
    }
}

const getSuscription = async(country, code, year) => {
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        if (value[1] == code) {
            suscription = value[year - 1956];
            return suscription
        }
    }
}

const getHalf = async(country, year) => {
    let sum = 0;
    let prom = 0;
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        let number = Number(value[year - 1956]);
        if (number > 0) {
            prom++;
            sum = sum + number;
        }
    }
    if (prom > 0) {
        prom = (sum / prom).toFixed(3)
        return prom
    } else {
        return 0
    }
}

const getTop = async(country, year) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (sus > num) {
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

const getTopMax = async(country, year, suscriptionCountry) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (sus > suscriptionCountry) {
            let datas = {
                Country: data[0],
                Code: data[1],
                Suscriptions: sus,
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

const getTopMin = async(country, year, suscriptionCountry) => {
    let top = []
    let num = 0;
    for (let data of country) {
        data = Object.values(data)
        sus = Number(data[year - 1956]);
        if (Number(sus) > 0) {
            if (suscription < suscriptionCountry) {
                let datas = {
                    Country: data[0],
                    Code: data[1],
                    Suscriptions: sus,
                }
                top.push(datas)
            }
            top.sort(function(a, b) {
                return b.Suscriptions - a.Suscriptions
            });
            top = top.slice(0, 5)
        }
    }
    return top
}

const datos = (path, country, year) => {
    let datos = consult(path, country, year)
    var respuesta = datos
    return respuesta;
}

const publicar = (path, country, year) => {
    datos(path, country, year).then((inf) => {
        if (inf.length > 0) {
            console.log('                                                                     ESTADÍSTICAS'.bgBlack.inverse);
            console.log();
            for (let i of inf) {
                if (i.Reference == 1) {
                    console.log(`                                          Media de suscripciones de todos los países en el año ${i.Year}`.bgRed);
                    console.log(`                                                                   ${i.Global_Media}`.bgBlue);
                    console.log();
                    console.log(`                                                                   Año`.bgRed);
                    console.log(`                                                                   ${i.Year}`.bgBlue);
                    console.log();
                    console.log(`                                                             Codigo de País`.bgRed);
                    console.log(`                                                                   ${i.Code}`.bgBlue);
                    console.log();
                    console.log(`                                                               Suscripciones`.bgRed);
                    console.log(`                                                                   ${i.Suscription}`.bgBlue);
                    console.log();
                    console.log(`                                               ${i.Value}`.bgBlack.inverse);
                }
            }
            console.log();
            const http = require('http');
            const hostname = '127.0.0.2';
            const port = 3000;
            let f = JSON.stringify(inf)
            const server = http.createServer((req, res) => {
                res.statusCode = 200;

                res.end(`<html>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <head>
                <meta charset="UTF-8">
                <title>Estadisticas</title>
                
                </head>
                <body style="background-color: white; color: black;">
                <h1 style="text-align: left;">PROYECTO PRIMER PARCIAL</h1>
                <h1 style="text-align: left;">PLATAFORMAS WEB</h1>
                <h1 style="text-align: left;">Estadisticas de suscripciones a telefonía celular móvil</h1>
                <div id="datosPersona" style="text-align:center;">
                <table class="tg"></table>
                </div>
                
                <script>
                function cargarDatos(){
                    var Datos = JSON.parse(${JSON.stringify(f)});
                    $(".tg").append(
                        '<thead>'+
                            '<tr>'+
                                '<th>Datos</th>'+
                            '</tr>'+
                        '</thead>'
                    );
                    $(".tg").append('<tbody>');
                    for(let i of Datos){
                        if (i.key == "info") {
                            $(".tg").append(
                                '<tr>' +
                                    '<td>Codigo del país:</td>'+
                                    '<td>' + i.Codigo + '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Año:</td>'+
                                    '<td>' + i.Anio +
                                '</tr>'+
                                '<tr>' +
                                    '<td>'+'Suscripcion de '+i.Codigo+' en el ' + i.Anio+'</td>'+
                                    '<td>' + i.Suscripcion + '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Media de suscripciones de todos los países: </td>'+
                                    '<td>' + i.MediaGlobal+
                                '</tr>'+
                                '<td>Estado: </td>'+
                                '<td>' + i.Estado+
                            '</tr>'
                            );
                        }     
                    }
                    $(".tg").append(
                        '<tr>'+
                            '<td>'+'Cinco países por encima'+Datos[0].Cod+'</td>'+
                        '</tr>'
                    );
                                for(let i of Datos){
                                    if (i.key =="tp5Max") {
                                        $(".tg").append(
                                            '<tr>' +
                                                '<td>Pais:</td>'+
                                                '<td>' + i.Pais + '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>Suscripciones:</td>'+
                                                '<td>' + i.Suscripciones +
                                            '</tr>'
                                        );
                                    }
                                }
                                $(".tg").append(
                                    '<tr>'+
                                        '<td>'+'Cinco países por DEBAJO'+Datos[0].Cod+'</td>'+
                                    '</tr>'
                                );
                                for(let i of Datos){
                                    if (i.key =="tp5Min") {
                                        if(i.Suscripciones>0){
                                            console.log(i)
                                        }
                                        $(".tg").append(
                                            '<tr>' +
                                                '<td">Pais:</td>'+
                                                '<td">' + i.Pais + '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td">Suscripciones:</td>'+
                                                '<td">' + i.Suscripciones +
                                            '</tr>'
                                        );
                                    }
                                }
                                $(".tg").append(
                                    '<tr>'+
                                        '<td>'+'TOP 5 de países'+Datos[0].Anio+'</td>'+
                                    '</tr>'
                                );
                                for(let i of Datos){
                                    if (i.key =="tp5") {
                                        $(".tg").append(
                                            '<tr>' +
                                                '<td>Pais:</td>'+
                                                '<td>' + i.Pais + '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>Suscripciones:</td>'+
                                                '<td>' + i.Suscripciones +
                                            '</tr>'
                                        );
                                    } 
                                }
                    $(".tg").append('</tbody>');
                }                    
                cargarDatos()
                </script>
                
                </button>
                </body>
                </html>
                `);
            });

            server.listen(port, hostname, () => {
                console.log(`Server running at http://${hostname}:${port}/`);
            });
        }
    });

    /* let est = {
        country: true,
        year: true
    }
    let n = "Country Name"
    let i = js.filter(n => n.Data_Source === "ABW")
        /*  if (index1, index2 >= 0) {
             
         } */

}

const guardar = async(path, code, year, out) => {
    leerDatos(out);
    consult(path, code, year).then((inf) => {
        for (let i of inf) {
            if (i.Reference == 1) {
                let medi = {
                    Global_Media: Number(i.Global_Media),
                    Year: year,
                    Code: code,
                    Suscription: Number(i.Suscription),
                    Value: i.Value,
                    Reference: 1
                }
                js.push(medi);
            }
        }
        for (let i of inf) {
            if (i.key == "tp5Max") {
                let tp5M = {
                    Pais: i.Pais,
                    Codigo: i.Codigo,
                    Suscripciones: i.Suscripciones,
                    Descripcion: `Pais por Encima del valor de suscripcion de ${i.Codigo}`,
                }
                js.push(tp5M)
            }
        }
        for (let i of inf) {
            if (i.key == "tp5Min") {
                let tp5min = {
                    Pais: i.Pais,
                    Codigo: i.Codigo,
                    Suscripciones: i.Suscripciones,
                    Descripcion: `País por Debajo del valor de suscripciones de ${i.Codigo}`,
                }
                js.push(tp5min)
            }
        }
        for (let i of inf) {
            if (i.key == "tp5") {
                let tp5 = {
                    Pais: i.Pais,
                    Suscripciones: i.Suscripciones,
                    Descripcion: `TOP 5 de países con suscripciones mas alta en el año ${year}`,
                }
                js.push(tp5)
            }
        }
        saveData(out);
    });
}

module.exports = {
    publicar,
    guardar
}