import express from 'express';
import mqtt from 'mqtt';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(__dirname, '../data/sensors.db'); //solo es una ruta para usar en la creación del db
const app = express();
const port = 3000;

//Sincronizado con fs (file system), similar a los defer de Js con HTML
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

//Objeto de sqlite
const db = new sqlite3.Database(DB_PATH);
db.run(`
    CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperatura REAL,
        humedad REAL,
        timestamp TEXT
    )
`); //REAL permite almacenar datos decimales con mayor precisión, node-red lo recomienda

// Conección al broker con la librería mqtt
const mqttClient = mqtt.connect('mqtt://mosquitto');

mqttClient.on('connect', () => {
    console.log('Conexión correcta al broker Mosquitto');
    mqttClient.subscribe('sensors/data');
    console.log('Suscrito al tópico sensores');
}); //Similar a kafka, se suscribe al backend a un tópico

mqttClient.on('message', (_topic, payload) => {
    const { temperatura, humedad, timestamp } = JSON.parse(payload.toString()); // Aquí se crean 3 variables a partir del payload, que se convierte a string, que se convierte a JSON
    db.run(
        `INSERT INTO sensor_data (temperatura, humedad, timestamp) VALUES (?, ?, ?)`,
        [temperatura, humedad, timestamp]
    );
}); //Parseado del payload (contenido que se recibe) e inserción en la base de datos
//El artificio ? permite ingresar una variable de typescript a la sentencia sql

// API GET con mi vida Express
app.get('/data', (_req, res) => {
    db.all('SELECT * FROM sensor_data ORDER BY id DESC LIMIT 30', [] /* Este [] vacío es lo mismo que expliqué arriba, sirve para ingresar variables como parámetros 
        al usar ?, pero en este caso no se usa*/, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message }); //La api envia un error en caso de que suceda algo rarito
        res.json(rows); //Simplemente devuelve las filas del query como respuesta json.
    });
});

app.listen(port, () => {
    console.log(`Hola hola, probando, estoy conectado en http://localhost:${port}`);
});
