const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const path = require('path');


// Create express app
const app = express();
const port = process.env.PORT || 3000;

let cors = require("cors");
app.use(cors());

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '../client/myapp/build')));

// Serve the index.html file (the entry point of your React app) for all GET requests

// app.get('/', (req, res) => {
//     const data = {name: 'Mario'};
//     res.render('index', data);
// });

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.render('user', data);        
        });
});


app.get('/menu_item', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    menu_items = []
    pool
        .query('SELECT * FROM menu_item;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                menu_items.push(query_res.rows[i]);
            }
            const data = {menu_items: menu_items};
            console.log(menu_items);
            res.send(data);        
        });
});


app.get('/testdb', (req, res) => {
    pool
        .query('SELECT NOW() as current_time')
        .then(query_res => {
            const currentTime = query_res.rows[0].current_time;
            res.send(`Database connection successful. Current time in the database: ${currentTime}`);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
            res.status(500).send('Database connection failed');
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/myapp/build', 'index.html'));
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});