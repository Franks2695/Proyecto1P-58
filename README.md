# Proyecto1P-58 - APLICACIÓN EN NODEJS SOBRE SUBSCRIPCIONES A TELEFONÍA CELULAR MÓVIL

_Aplicación que permite leer los datos de las Suscripciones a telefonía celular móvil, publicadas por el Banco Mundial y publicar las estadísticas de un determinado país en un
año específico._

### Pre-requisitos 📋

_Para la realización y ejecución de esta aplicación, debe tener instalado lo siguiente en su máquina:_

* **VISUAL STUDIO CODE**
* **NODE-JS**
* **NPM**

_Librerías necesarias para que el programa funcione, pero si es que no desea hacerlo, el archivo llamado **package.json** ya contiene estas librerías._

* **yargs**
* **csvtojson**
* **colors**

### Instalación 🔧

_Primer vamos a instalar lo más importante, **Visual Studio Code**, para ello podemos guiarnos en la siguiente página, en donde nos enseña paso a paso cómo instalar **Visual Studio Code**._

_https://support.academicsoftware.eu/hc/es/articles/360006916138-C%C3%B3mo-instalar-Microsoft-Visual-Studio-Code_

_Ahora tenemos que instalar NodeJs y npm en nuestro **Visual Studio Code** y de la misma manera podemos guiarnos en la siguiente página para poder instalarlo sin complicaciones._

_https://developer.ibm.com/languages/node-js/tutorials/learn-nodejs-installing-node-nvm-and-vscode/_

_Una vez hecho todo lo anterior, si esque no se tiene el archivo **package.json**, entonces podemos instalar las librerías con el siguiente comando:_

```
npm install <librería> --save
```

_Al acabar la instalación de todas las librerías podremos verlas dentro del archivo **package.json**_

![Captura1](https://user-images.githubusercontent.com/76794301/119156253-ac253380-ba19-11eb-961f-096a9d9aaa4e.JPG)

_Para esta aplicación se hizo uso de un archivo csv, el cual lo podemos descargar directamente desde esta página:_

_https://datos.bancomundial.org/indicador/IT.CEL.SETS_

_Una vez descargado el archivo, lo descomprimimos y el archivo llamado **API_IT.CEL.SETS_DS2_es_csv_v2_2278396** lo dejamos en nuestra carpeta raíz luego de haber descargado los documentos de este repositorio_

_Antes de pasar a la parte de la ejecución de pruebas, recordar que este programa funciona con modulos de node, así que para que el programa pueda ejecutarse correctamente, se debe escribir el siguiente comando:_

```
npm install
```

_Ahora si podemos seguir con la ejecución de las pruebas_

## Ejecutando las pruebas ⚙️

_Primero debemos tener en cuenta que nuestra aplicación o programa cuenta con Requerimientos funcionales y no funcionales_

#### Requerimientos funcionales:

_Las estadísticas que la aplicación analiza son las siguientes:_

* **La media de suscripciones de todos los países en el año especificado.**
* **Establecer si el valor de las suscripciones del país determinado, es mayor o menor a la media mundial.**
* **Los cinco países por encima del valor de suscripciones del país determinado.**
* **Los cinco países por debajo del valor de suscripciones del país determinado.**
* **El top cinco de países para el año especificado.**

#### Requerimientos no funcionales:

_La aplicación dispone de dos comandos:_

* **publicar**
* **guardar**

_Independientemente del comando que se ejecute, el programa muestra los resultados en la terminal (se utilizaron colores). También se consideraron las validaciones correspondientes para todos los parámetros de los comandos._

_El primer comando es **publicar**. Este comando publica las estadísticas en una página web básica. Se requieren de tres parámetros:_

* **--file -f: Permite establecer el path del archivo CSV que contiene los datos a analizar**
* **--country -c: Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3.**
* **--year -y: Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 2018.**


#### COMANDO PUBLICAR

_Para hacer uso de estos comandos debe conocer que se los escriben mediante consola y sus estructura es la siguiente:_

```
node app.js publicar -f "./API_IT.CEL.SETS_DS2_es_csv_v2_2278396.csv" -c "Código de país" -y <año>
```
_RESULTADO DE LAS ESTADÍSTICAS POR CONSOLA:_

![Captura](https://user-images.githubusercontent.com/76794301/119156122-8ac44780-ba19-11eb-9274-44e3088ab214.JPG)

_Para poder visualizar las estadísticas en la página web lo único que tiene que hacer es poner esta dirección en su navegador web preferido:_

```
http://localhost:3000
```

_RESULTADO DE LAS ESTADÍSTICAS EN LA PÁGINA WEB:_

![Captura2](https://user-images.githubusercontent.com/76794301/119156508-e7bffd80-ba19-11eb-9dc2-ac48b0acee73.JPG)

_El segundo comando es guardar. Este comando almacenará los resultados de las estadísticas en un archivo json. Recibe los mismos parámetros que el comando anterior, y se adiciona la siguiente opción:_

* **--out -o: Establece el nombre del archivo donde se almacenará los resultados.**

#### COMANDO GUARDAR

_La estructura para este comando es el siguiente:_

```
node app.js guardar -f "./API_IT.CEL.SETS_DS2_es_csv_v2_2278396.csv" -c "<Código de país>" -y <año>  -o "<nombre de archivo>"
```

_RESULTADO DE LAS ESTADÍSTICAS GUARDADAS EN UN ARCHIVO JSON:_

![Captura4](https://user-images.githubusercontent.com/76794301/119156560-f4dcec80-ba19-11eb-900f-951a472284e2.JPG)

## Restricciones

* El análisis estadístico se debe manejar como un módulo por separado y dividido en varias funciones.
* El código se debe manejar como un proyecto npm.

## Construido con 🛠️

* [Visual Studio Code](https://code.visualstudio.com/) - IDE de desarrollo
* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución para JavaScript

## Autores ✒️

* **Franks Sañay** - *Trabajo Inicial, Documentación* - [Franks2695](https://github.com/Franks2695)
---
