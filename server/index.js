const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const path = require('path');


// Create express app
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');

let cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendex: true}));

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

// app.set("view engine", "ejs");

// app.get('/', (req, res) => {
//     const data = {name: 'Mario'};
//     res.render('index', data);
// });

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
          
app.get('/last_customer', (req, res) => { 
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query("SELECT * FROM customer ORDER BY customer_id DESC LIMIT 1;")
      .then(query_res => {
          const response = query_res.rows;
          res.json(response);
      })
      .catch(error => {
          console.error('Database query failed:', error);
          res.status(500).send('Failed to retrieve customer query data');
      });
  });

  app.get('/last_order', (req, res) => { 
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query("SELECT * FROM orders ORDER BY order_id DESC LIMIT 1;")
      .then(query_res => {
          const response = query_res.rows;
          res.json(response);
      })
      .catch(error => {
          console.error('Database query failed:', error);
          res.status(500).send('Failed to retrieve order query data');
      });
  });


  app.get('/last_drink', (req, res) => { 
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query("SELECT * FROM drink ORDER BY drink_id DESC LIMIT 1;")
      .then(query_res => {
          const response = query_res.rows;
          res.json(response);
      })
      .catch(error => {
          console.error('Database query failed:', error);
          res.status(500).send('Failed to retrieve drink query data');
      });
  });

  app.get('/get_topping_by_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM topping WHERE topping_id = $1', [id]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Topping not found');
        }
    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get_menu_item_ingredients_by_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM menu_ingredients_mapper WHERE menu_item_id = $1', [id]);
        console.log(result);
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get_ingredient_by_id/:id', async (req, res) => {
    try {
        console.log("sanity check");
        const { id } = req.params;
        console.log(id);

        const result = await pool.query('SELECT * FROM ingredients WHERE ingredients_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/make_customer', (req, res) => {
    const customerName = req.body.name;
    res.set('Access-Control-Allow-Origin', '*');
    pool
      .query('INSERT INTO customer (name) VALUES ($1)', [customerName])
      .then(() => {
        res.send('Customer added successfully');
    })
      .catch(error => {
        console.error('Error inserting custmer:', error);
        res.status(500).send('Failed to add customer');
      });
  });

app.post('/make_order', (req, res) => {

    const customer_id = req.body.customer_id;
    const employee_id = req.body.employee_id;
    const date = req.body.date;
    const price = req.body.price;
    const time = req.body.time;

    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('INSERT INTO orders (customer_id, employee_id, date, total_price, time) VALUES ($1, $2, $3, $4, $5)', [customer_id, employee_id, date, price, time])
        .then(() => {
        res.send('Order added successfully');
    })
        .catch(error => {
        console.error('Error inserting order:', error);
        res.status(500).send('Failed to add order');
        });
});

app.post('/make_drink', (req, res) => {

    const menu_item_id = req.body.menu_item_id;
    const order_id = req.body.order_id;
    const sweetness = req.body.sweetness;
    const price = req.body.price;
    const ice_level = req.body.ice_level;

    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('INSERT INTO drink (menu_item_id, order_id, sweetness, price, ice_level) VALUES ($1, $2, $3, $4, $5)', [menu_item_id, order_id, sweetness, price, ice_level])
        .then(() => {
        res.send('Drink added successfully');
    })
        .catch(error => {
        console.error('Error inserting drink:', error);
        res.status(500).send('Failed to add drink');
        });
});

app.post('/make_drink_topping', (req, res) => {

    const drink_id = req.body.drink_id;
    const topping_id = req.body.topping_id;

    res.set('Access-Control-Allow-Origin', '*');
    pool
        .query('INSERT INTO drink_topping (drink_id, topping_id) VALUES ($1, $2)', [drink_id, topping_id])
        .then(() => {
        res.send('drink-topping added successfully');
    })
        .catch(error => {
        console.error('Error inserting topping:', error);
        res.status(500).send('Failed to add topping');
        });
});

app.put('/set_topping_availability', async (req, res) => {
    try {
      const topping_id = req.body.topping_id;
      const new_availability = req.body.new_availability
      await pool.query('UPDATE topping SET availability = $1 WHERE topping_id = $2', [new_availability, topping_id]);
      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.put('/set_ingredient_availability', async (req, res) => {
try {
    const ingredient_id = req.body.ingredient_id;
    const new_availability = req.body.new_availability
    await pool.query('UPDATE ingredients SET availability = $1 WHERE ingredients_id = $2', [new_availability, ingredient_id]);
    res.status(200).json({ message: 'Item updated successfully' });
} catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
}
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

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));

app.get('/', function(req, res) {
    res.render('pages/auth');
});

app.listen(port, () => {
    console.log(`Example app listening at https://test331project.onrender.com/}`);
});

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: "832055876235-3o5uqtqgj8o709loq1odq87a4mebgp1o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://three31server.onrender.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
));
 
app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        // Successful authentication, redirect success.
        res.redirect('https://test331project.onrender.com/App');
});
