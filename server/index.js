const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();


// Create express app
const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

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


app.get('/customer', (req, res) => { //Customer Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT customer_id, name FROM customer ORDER BY name;')
        .then(query_res => {
            const customers = query_res.rows;
            console.log(customers);
            res.json(customers);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve customers');
        });
});


app.get('/drink', (req, res) => { //Drink Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT drink_id, menu_item_id, order_id, sweetness, price, ice_level FROM drink ORDER BY price;')
        .then(query_res => {
            const drinks = query_res.rows;
            console.log(drinks);
            res.json(drinks);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve drinks');
        });
});



app.get('/drink-topping', (req, res) => { //Drink Topping Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT * FROM drink_topping;')
        .then(query_res => {
            const drinkToppings = query_res.rows;
            console.log(drinkToppings);
            res.json(drinkToppings);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve drink toppings');
        });
});




app.get('/employee', (req, res) => { //Employee Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query('SELECT employee_id, manager, name FROM employee ORDER BY employee_id;')
      .then(query_res => {
          const employees = query_res.rows;
          console.log(employees);
          res.json(employees);
      })
      .catch(error => {
          console.error('Database query failed:', error);
          res.status(500).send('Failed to retrieve employees');
      });
  });
  

  app.get('/ingredients', (req, res) => { //Ingredients Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT * FROM ingredients ORDER BY ingredients_id;')
        .then(query_res => {
            const ingredients = query_res.rows;
            console.log(ingredients);
            res.json(ingredients);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve ingredients');
        });
});


app.get('/menu-ingredients-mapper', (req, res) => { //Menu Ingredients Mapper Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query('SELECT menu_ingredients_mapper_id, menu_item_id, ingredients_id FROM menu_ingredients_mapper ORDER BY menu_ingredients_mapper_id;')
      .then(query_res => {
          const menuIngredientsMapper = query_res.rows;
          console.log(menuIngredientsMapper);
          res.json(menuIngredientsMapper);
      })
      .catch(error => {
          console.error('Database query failed:', error);
          res.status(500).send('Failed to retrieve menu ingredients mapper data');
      });
  });
  



app.get('/menu_item', (req, res) => { //Menu Item Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT * FROM menu_item ORDER BY type;')
        .then(query_res => {
            const menu_items = query_res.rows;

            const categorizedMenuItems = {};

            menu_items.forEach(item => {
                if (!categorizedMenuItems[item.type]) {
                    categorizedMenuItems[item.type] = [];
                }
                categorizedMenuItems[item.type].push(item);
            });

            console.log(categorizedMenuItems);
            res.json(categorizedMenuItems);        
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve menu items');
        });
});



app.get('/orders', (req, res) => { //Orders Datatable
    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('SELECT order_id, customer_id, employee_id, date, total_price, time FROM orders ORDER BY date DESC, time DESC;')
        .then(query_res => {
            const orders = query_res.rows;
            console.log(orders);
            res.json(orders);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve orders');
        });
});




app.get('/topping', (req, res) => { //Topping Datatable
  res.set('Access-Control-Allow-Origin', '*');
  pool
    .query('SELECT topping_id, name, price, availability FROM topping ORDER BY topping_id;')
    .then(query_res => {
        const toppings = query_res.rows;
        console.log(toppings);
        res.json(toppings);
    })
    .catch(error => {
        console.error('Database query failed:', error);
        res.status(500).send('Failed to retrieve toppings');
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});