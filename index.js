//----------------------------------------------------------------HTTP--SZERVER--INDITAS----------------------------------------------------------------//
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------------------------------Az--ADATBAZIS--ELÉRÉSE----------------------------------------------------------------//
const mysql = require('mysql');
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
})
database.connect((err) =>
{
    if(err) throw err;
    console.log('Csatlakoztatva!')
});
//----------------------------------------------------------------TAGDIJ--KEZDOLAP----------------------------------------------------------------//
app.get('/tagdijkezdolap', (req, res) => {
const html = `
    <!DOCTYPE html>
        <html lang="hu">
            <head>
                <meta charset="UTF-8">
                <title>Tagdíj | Kezdőlap</title>
                <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0-alpha1/css/bootstrap.min.css"integrity="sha512-72OVeAaPeV8n3BdZj7hOkaPSEk/uwpDkaGyP4W2jSzAC8tfiO4LMEDWoL3uFp5mcZu+8Eehb4GhZWFwvrss69Q=="crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <body>
                <h1>Műveletek:</h1>
                <div class="container">
                    <div class="row row p-4 justify-content-center">
                        <button  class="btn btn-outline-warning col-2 m-2" href="http://localhost:5000/tagdijosszesugyfel" id="OsszesUgyfel">ÖSSZES ÜGYFÉL</button>
                        <button class="btn btn-outline-primary col-2 m-2" href="hattp://localhost:5000/tagdijujugyfel" id="EgyUgyfel">EGY ÜGYFÉL ADATA</button>
                        <button class="btn btn-outline-success col-2 m-2" href="" id="UjUgyfel">ÚJ ÜGYFÉL RÖGZITÉS</button>
                        <button class="btn btn-outline-danger col-2 m-2" href="" id="UgyfelTorles">ÜGYFÉL TÖRLÉS</button>
                        <button class="btn btn-outline-danger col-2 m-2" href="" id="UgyfelAdatTorles">ÜGYFÉL ADAT TÖRLÉS</button>
                        <button class="btn btn-outline-success col-2 m-2" href="" id="UgyfelAdatModositas">ÜGYFÉL ADAT MÓDOSÍTÁS</button>
                    </div>
                </div>
            <script>
                    document.getElementById('OsszesUgyfel').addEventListener('click', function() {
                        window.location.href = '/tagdijosszesugyfel'; });
                    document.getElementById('EgyUgyfel').addEventListener('click', function() {
                        window.location.href = '/tagdijegyugyfel'; });
                    document.getElementById('UjUgyfel').addEventListener('click', function() {
                        window.location.href = '/tagdijUjUgyfel'; });
                    document.getElementById('UgyfelTorles').addEventListener('click', function() {
                        window.location.href = '/tagdijugyfeltorles'; });
                    document.getElementById('UgyfelAdatTorles').addEventListener('click', function() {
                        window.location.href = '/tagdijugyfeladattorles'; });
                    document.getElementById('UgyfelAdatModositas').addEventListener('click', function() {
                        window.location.href = '/tagdijugyfeladatmodosias'; });
            </script>
            <style>
                body{ 
                    background-image: linear-gradient(black, purple, black);
                    background-attachment: fixed;
                }
                h1{
                    color: white;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-style: bold;
                    text-align: center;
                    text-decoration: underline;
                    padding: 60px;
                }
            </stlye>
            </body>
        </html>
    `;
res.send(html);});
//----------------------------------------------------------------TAGDIJ--OSSZES--UGYFEL----------------------------------------------------------------//
app.get('/tagdijosszesugyfel', (req, res) => {
let sqlcommand = `SELECT * FROM ugyfel`;
database.query(sqlcommand, (err, rows) => {
    if (err) throw err;
    // Az adatokból táblázatot építünk
let htmlResponse = `
    <!DOCTYPE html>
        <html lang="hu">
            <head>
                <meta charset="UTF-8">
                <title>Tagdíj | Ügyfelek</title>
                <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0-alpha1/css/bootstrap.min.css"integrity="sha512-72OVeAaPeV8n3BdZj7hOkaPSEk/uwpDkaGyP4W2jSzAC8tfiO4LMEDWoL3uFp5mcZu+8Eehb4GhZWFwvrss69Q=="crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <body>
                <h1>Az összes ügyfél adata</h1>
                <div>
                    <span id="Kezdolap">
                        <a href="http://localhost:5000/tagdijkezdolap"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
                    </span>
                </div>
                <div class="tablazat">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Azonosító:</th>
                                <th>Név:</th>
                                <th>Születési év:</th>
                                <th>Írányítószám:</th>
                                <th>Ország:</th>
                            </tr>
                        </thead>
                        <tbody>   
`;
// Adatok hozzáadása a táblázathoz
 rows.forEach(row => {
    htmlResponse += `
        <tr>
            <td>${row.azon}</td>
            <td>${row.nev}</td>
            <td>${row.szulev}</td>
            <td>${row.irszam}</td>
            <td>${row.orsz}</td>
        </tr>
`;});

// Táblázat lezárása és válasz visszaküldése a frontendnek
htmlResponse += `
                        </tbody>
                </table>
                </div>
                <style>
                body {
                    background-image: linear-gradient(black, purple, black);
                    background-attachment: fixed;
                }

                h1 {
                    color: white;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-style: bold;
                    text-align: center;
                    text-decoration: underline;
                    padding: 30px;
                }

                .tablazat {
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-style: bold;
                }

                .tablazat th {
                    color: white;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-style: bold;
                    text-align: center;
                    text-decoration: underline;
                    margin: 10px;
                    padding: 10px;
                }

                .tablazat td {
                    color: white;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-style: bold;
                    text-align: center;
                    margin: 10px;
                    padding: 10px;
                }
                #Kezdolap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 10px;
                    margin: 20px;
                }
                #Kezdolap a {
                    color: white;
                    text-decoration: none; /* Eltávolítjuk az aláhúzást */
                }
                #Kezdolap a:hover {
                    color: grey;
                }
            </style>
            </body>
    </html>
`;
// Válasz visszaküldése a frontendnek
res.send(htmlResponse);
    });
});


//----------------------------------------------------------------TAGDIJ--EGY--UGYFEL----------------------------------------------------------------//
 app.get('/ugyfelKeresese', (req, res) => {
    const ugyfelKeresese = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <title>Ügyfél keresése</title>
        </head>
        <body>
        <div class="container">
        <div class="row">
            <h1>Írja be az ügyfél azonosítóját!</h1>
            <form action="/ugyfelKeresese" method="get">
                <label for="azonositoID">Tartomány: 1001 - 1013</label>
                <br>
                <input type="number" id="azonositoID" name="azonositoID" value="1001">
                <br>
                <br>
                <button type="submit" class="btn btn-primary">Keresés</button>
            </form>
        </div>
        </div>
        <stlye>
        body {
            background-image: linear-gradient(black, purple, black);
            background-attachment: fixed;
        }
    
        h1 {
            color: white;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-style: bold;
            text-align: center;
            text-decoration: underline;
            padding: 30px;
        }
    
        .tablazat {
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-style: bold;
        }
    
        .tablazat th {
            color: white;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-style: bold;
            text-align: center;
            text-decoration: underline;
            margin: 10px;
            padding: 10px;
        }
    
        .tablazat td {
            color: white;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-style: bold;
            text-align: center;
            margin: 10px;
            padding: 10px;
        }
        #Kezdolap {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            margin: 20px;
        }
        #Kezdolap a {
            color: white;
            text-decoration: none; /* Eltávolítjuk az aláhúzást */
        }
        #Kezdolap a:hover {
            color: grey;
        }
        </stlye>
        </body>
        </html>
    `;

    const azonosito = req.query.azonositoID;

    if (azonosito) {
        const lekerdezes = 'SELECT * FROM ugyfel WHERE azon = ?';
        database.query(lekerdezes, [azonosito], (err, rows) => {
            if (err) {
                throw err;
            }

            if (rows.length > 0) {
                const ugyfelAdatok = rows[0];
                res.send(`<pre>${JSON.stringify(ugyfelAdatok, null, 2)}</pre>`);
            } else {
                res.status(404).send('Az adott azonosítóval ügyfél nem található.');
            }
        });
    } else {
        res.send(ugyfelKeresese);
    }
});
        
//----------------------------------------------------------------SZERVER--FUTTATÁSA----------------------------------------------------------------//
app.listen (5000, () => {
    console.log('A szerver sikeresen fut!')
});