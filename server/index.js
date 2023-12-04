const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const path = require("path");

// Create express app
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");

let cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extendex: true }));

// Create pool
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: { rejectUnauthorized: false },
});

// Add process hook to shutdown pool
process.on("SIGINT", function () {
  pool.end();
  console.log("Application successfully shutdown");
  process.exit(0);
});

// app.set("view engine", "ejs");

// app.get('/', (req, res) => {
//     const data = {name: 'Mario'};
//     res.render('index', data);
// });

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.get("/", function (req, res) {
  res.render(path.join(__dirname, "../client/myapp/src/index.js"));
});

// Serve the index.html file (the entry point of your React app) for all GET requests

// app.get('/', (req, res) => {
//     const data = {name: 'Mario'};
//     res.render('index', data);
// });

app.get("/user", (req, res) => {
  teammembers = [];
  pool.query("SELECT * FROM teammembers;").then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      teammembers.push(query_res.rows[i]);
    }
    const data = { teammembers: teammembers };
    console.log(teammembers);
    res.render("user", data);
  });
});

app.get("/customer", (req, res) => {
  //Customer Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT customer_id, name, auth_token, email FROM customer ORDER BY name;"
    )
    .then((query_res) => {
      const customers = query_res.rows;
      console.log(customers);
      res.json(customers);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve customers");
    });
});

app.get("/drink", (req, res) => {
  //Drink Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT drink_id, menu_item_id, order_id, sweetness, price, ice_level FROM drink ORDER BY price;"
    )
    .then((query_res) => {
      const drinks = query_res.rows;
      console.log(drinks);
      res.json(drinks);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve drinks");
    });
});

app.get("/drink-topping", (req, res) => {
  //Drink Topping Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM drink_topping;")
    .then((query_res) => {
      const drinkToppings = query_res.rows;
      console.log(drinkToppings);
      res.json(drinkToppings);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve drink toppings");
    });
});

app.get("/employee", (req, res) => {
  //Employee Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT employee_id, manager, name, auth_token FROM employee ORDER BY employee_id;"
    )
    .then((query_res) => {
      const employees = query_res.rows;
      console.log(employees);
      res.json(employees);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve employees");
    });
});

app.get("/employee/:email", (req, res) => {
    const { email } = req.params;
    res.set("Access-Control-Allow-Origin", "*");
    pool
      .query(
        "SELECT * FROM employee WHERE email = $1",
        [email]
      )
      .then((query_res) => {
        const employeeData = query_res.rows;
        if (employeeData.length > 0) {
          res.json(employeeData); // Return employee data if found
        } else {
          res.json(null); // Return null if email doesn't exist
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        res.status(500).send("Failed to retrieve employee data");
      });
  });

  
app.get("/ingredients", (req, res) => {
  //Ingredients Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM ingredients ORDER BY ingredients_id;")
    .then((query_res) => {
      const ingredients = query_res.rows;
      console.log(ingredients);
      res.json(ingredients);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve ingredients");
    });
});

app.get("/menu-ingredients-mapper", (req, res) => {
  //Menu Ingredients Mapper Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT menu_ingredients_mapper_id, menu_item_id, ingredients_id FROM menu_ingredients_mapper ORDER BY menu_ingredients_mapper_id;"
    )
    .then((query_res) => {
      const menuIngredientsMapper = query_res.rows;
      console.log(menuIngredientsMapper);
      res.json(menuIngredientsMapper);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve menu ingredients mapper data");
    });
});

app.get("/menu_item", (req, res) => {
  //Menu Item Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM menu_item ORDER BY type;")
    .then((query_res) => {
      const menu_items = query_res.rows;

      const categorizedMenuItems = {};

      menu_items.forEach((item) => {
        if (!categorizedMenuItems[item.type]) {
          categorizedMenuItems[item.type] = [];
        }
        categorizedMenuItems[item.type].push(item);
      });

      console.log(categorizedMenuItems);
      res.json(categorizedMenuItems);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve menu items");
    });
});

app.get("/orders", (req, res) => {
  //Orders Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT order_id, customer_id, employee_id, date, total_price, time FROM orders ORDER BY date DESC, time DESC;"
    )
    .then((query_res) => {
      const orders = query_res.rows;
      console.log(orders);
      res.json(orders);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve orders");
    });
});

app.get("/topping", (req, res) => {
  //Topping Datatable
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "SELECT topping_id, name, price, availability FROM topping ORDER BY topping_id;"
    )
    .then((query_res) => {
      const toppings = query_res.rows;
      console.log(toppings);
      res.json(toppings);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve toppings");
    });
});

app.get("/last_customer", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM customer ORDER BY customer_id DESC LIMIT 1;")
    .then((query_res) => {
      const response = query_res.rows;
      res.json(response);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve customer query data");
    });
});

app.get("/last_order", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM orders ORDER BY order_id DESC LIMIT 1;")
    .then((query_res) => {
      const response = query_res.rows;
      res.json(response);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve order query data");
    });
});

app.get("/last_drink", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("SELECT * FROM drink ORDER BY drink_id DESC LIMIT 1;")
    .then((query_res) => {
      const response = query_res.rows;
      res.json(response);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve drink query data");
    });
});

app.get("/get_topping_by_id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM topping WHERE topping_id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Topping not found");
    }
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get_menu_item_ingredients_by_id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM menu_ingredients_mapper WHERE menu_item_id = $1",
      [id]
    );
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get_ingredient_by_id/:id", async (req, res) => {
  try {
    console.log("sanity check");
    const { id } = req.params;
    console.log(id);

    const result = await pool.query(
      "SELECT * FROM ingredients WHERE ingredients_id = $1",
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/check-customer-exist/:email", (req, res) => {
  const { email } = req.params;

  pool
    .query(
      "SELECT EXISTS (SELECT 1 FROM customer WHERE email = $1) as exists",
      [email]
    )
    .then((query_res) => {
      const customerExists = query_res.rows[0].exists;
      res.json({ exists: customerExists });
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to check customer existence");
    });
});

app.post("/make_customer", (req, res) => {
  const customerName = req.body.name;
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("INSERT INTO customer (name) VALUES ($1)", [customerName])
    .then(() => {
      res.send("Customer added successfully");
    })
    .catch((error) => {
      console.error("Error inserting custmer:", error);
      res.status(500).send("Failed to add customer");
    });
});

app.post("/add_new_customer", (req, res) => {
  const { name, auth_token, email } = req.body;
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "INSERT INTO customer (name, auth_token, email) VALUES ($1, $2, $3)",
      [name, auth_token, email]
    )
    .then(() => {
      res.send("New customer added successfully");
    })
    .catch((error) => {
      console.error("Error inserting customer:", error);
      res.status(500).send("Failed to add new customer");
    });
});

app.post("/add_new_menu_item", (req, res) => {
  const { name, type, price } = req.body;
  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "INSERT INTO menu_item (name, type, price) VALUES ($1, $2, $3)",
      [name, type, price]
    )
    .then(() => {
      res.send("New menu item added successfully");
    })
    .catch((error) => {
      console.error("Error inserting menu item:", error);
      res.status(500).send("Failed to add new menu item");
    });
  });
 

app.get("/get-customer-by-email/:email", (req, res) => {
  const { email } = req.params;
  pool
    .query("SELECT * FROM customer WHERE email = $1", [email])
    .then((query_res) => {
      const customerData = query_res.rows;
      res.json(customerData);
    })
    .catch((error) => {
      console.error("Error fetching customer data:", error);
      res.status(500).send("Failed to retrieve customer data");
    });
});

app.post("/update_customer/:email", (req, res) => {
    const { name, auth_token } = req.body;
    const { email } = req.params; // Extracting email from URL parameters
    res.set("Access-Control-Allow-Origin", "*");
    pool
      .query(
        "UPDATE customer SET name = $1, auth_token = $2 WHERE email = $3",
        [name, auth_token, email]
      )
      .then((result) => {
        if (result.rowCount > 0) {
          res.send("Customer updated successfully");
        } else {
          res.status(404).send("Customer not found");
        }
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        res.status(500).send("Failed to update customer");
      });
  });


app.post("/make_order", (req, res) => {
  const customer_id = req.body.customer_id;
  const employee_id = req.body.employee_id;
  const date = req.body.date;
  const price = req.body.price;
  const time = req.body.time;

  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "INSERT INTO orders (customer_id, employee_id, date, total_price, time) VALUES ($1, $2, $3, $4, $5)",
      [customer_id, employee_id, date, price, time]
    )
    .then(() => {
      res.send("Order added successfully");
    })
    .catch((error) => {
      console.error("Error inserting order:", error);
      res.status(500).send("Failed to add order");
    });
});

app.post("/make_drink", (req, res) => {
  const menu_item_id = req.body.menu_item_id;
  const order_id = req.body.order_id;
  const sweetness = req.body.sweetness;
  const price = req.body.price;
  const ice_level = req.body.ice_level;

  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query(
      "INSERT INTO drink (menu_item_id, order_id, sweetness, price, ice_level) VALUES ($1, $2, $3, $4, $5)",
      [menu_item_id, order_id, sweetness, price, ice_level]
    )
    .then(() => {
      res.send("Drink added successfully");
    })
    .catch((error) => {
      console.error("Error inserting drink:", error);
      res.status(500).send("Failed to add drink");
    });
});

app.post("/make_drink_topping", (req, res) => {
  const drink_id = req.body.drink_id;
  const topping_id = req.body.topping_id;

  res.set("Access-Control-Allow-Origin", "*");
  pool
    .query("INSERT INTO drink_topping (drink_id, topping_id) VALUES ($1, $2)", [
      drink_id,
      topping_id,
    ])
    .then(() => {
      res.send("drink-topping added successfully");
    })
    .catch((error) => {
      console.error("Error inserting topping:", error);
      res.status(500).send("Failed to add topping");
    });
});

app.put("/set_topping_availability", async (req, res) => {
  try {
    const topping_id = req.body.topping_id;
    const new_availability = req.body.new_availability;
    await pool.query(
      "UPDATE topping SET availability = $1 WHERE topping_id = $2",
      [new_availability, topping_id]
    );
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/set_ingredient_availability", async (req, res) => {
  try {
    const ingredient_id = req.body.ingredient_id;
    const new_availability = req.body.new_availability;
    await pool.query(
      "UPDATE ingredients SET availability = $1 WHERE ingredients_id = $2",
      [new_availability, ingredient_id]
    );
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.delete("/delete_menu_item/:id", async (req, res) => {
    const menu_item_id = req.params.id;

    try {
        await pool.query("DELETE FROM menu_item WHERE menu_item_id = $1", [
            menu_item_id,
        ]);
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/delete_topping/:id", async (req, res) => {
    const topping_id = req.params.id;

    try {
        await pool.query("DELETE FROM topping WHERE topping_id = $1", [
            topping_id,
        ]);
        res.status(200).json({ message: "Topping deleted successfully" });
    } catch (error) {
        console.error("Error deleting topping:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.delete("/delete_ingredient/:id", async (req, res) => {
    const ingredient_id = req.params.id;

    try {
        await pool.query("DELETE FROM ingredients WHERE ingredients_id = $1", [
            ingredient_id,
        ]);
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get("/testdb", (req, res) => {
  pool
    .query("SELECT NOW() as current_time")
    .then((query_res) => {
      const currentTime = query_res.rows[0].current_time;
      res.send(
        `Database connection successful. Current time in the database: ${currentTime}`
      );
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      res.status(500).send("Database connection failed");
    });
});

app.get("/sales_report", (req, res) => {
  const startDate = req.query.start_date; // Get the start date from the query parameters
  const endDate = req.query.end_date; // Get the end date from the query parameters

  console.log(startDate);

  pool
    .query(
      `
            WITH DrinksInRange AS (
                SELECT d.menu_item_id
                FROM orders o
                JOIN drink d ON o.order_id = d.order_id
                WHERE o.date BETWEEN $1 AND $2
            )

            SELECT mi.name, mi.type, COUNT(dri.menu_item_id) as order_count
            FROM DrinksInRange dri
            JOIN menu_item mi ON dri.menu_item_id = mi.menu_item_id
            GROUP BY mi.name, mi.type
            ORDER BY order_count DESC;
        `,
      [startDate, endDate]
    )
    .then((query_res) => {
      const sales_report = query_res.rows;
      console.log(sales_report);
      res.json(sales_report);
    })
    .catch((error) => {
      console.error("Database query failed:", error);
      res.status(500).send("Failed to retrieve sales report");
    });
});

app.put("/set_drink_price", async (req, res) => {
    try{
        const drink_id = req.body.drink_id;
        const new_price = req.body.new_price;
        await pool.query("UPDATE menu_item SET price = $1 WHERE menu_item_id = $2", [new_price, drink_id]);
        res.status(200).json({message: "Item updated successfully"});
    }
    catch(error){
        console.error("Error updating item:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.put("/set_topping_price", async (req, res) => {
    try{
        const topping_id = req.body.topping_id;
        const new_price = req.body.new_price;
        await pool.query("UPDATE topping SET price = $1 WHERE topping_id = $2", [new_price, topping_id]);
        res.status(200).json({message: "Item updated successfully"});
    }
    catch(error){
        console.error("Error updating item:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.get("/", function (req, res) {
  res.render("pages/auth");
});

app.listen(port, () => {
  console.log(`Example app listening at https://test331project.onrender.com/}`);
});

/*  PASSPORT SETUP  */

const passport = require("passport");
var userProfile;
var userToken;

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", (req, res) => res.send(userProfile));
app.get("/token", (req, res) => res.send(userToken));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = "our-google-client-id";
const GOOGLE_CLIENT_SECRET = "our-google-client-secret";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      userToken = accessToken;
      return done(null, userProfile, userToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect(process.env.FRONT_END_WEB_ADDRESS + "/App");
  }
);

//// SIGN OUT ////

// Added code for token revocation
const revokeToken = (userCredential) => {
  const https = require("https");

  const postData = "token=" + userToken;
  console.log("Received token:", userToken);
  const postOptions = {
    host: "oauth2.googleapis.com",
    port: "443",
    path: "/revoke",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const postReq = https.request(postOptions, function (res) {
    res.setEncoding("utf8");
    res.on("data", (d) => {
      console.log("Response: " + d);
    });
  });

  postReq.on("error", (error) => {
    console.log(error);
  });

  postReq.write(postData);
  postReq.end();
};

app.get("/logout", (req, res) => {
  // Assuming you have stored user credentials in the session
  // Check if userToken exists
  if (userToken) {
    // Call revokeToken to revoke the access token
    revokeToken(userToken);
    // Clear the user's session
    req.session.destroy();
  }
  userProfile = {};
  userToken = {};

  // Respond as needed
  res.redirect(process.env.FRONT_END_WEB_ADDRESS);
});



app.get('/excess_report', (req, res) => {
    const startDate = req.query.start_date; 
    pool
        .query(`
            WITH IngredientUsage AS (
                WITH FilteredOrders AS (
                    SELECT order_id
                    FROM orders
                    WHERE (date) > ($1)
                )
                , IngredientUsage AS (
                    SELECT mim.ingredients_id
                    FROM FilteredOrders fo
                    JOIN drink d ON fo.order_id = d.order_id
                    JOIN menu_ingredients_mapper mim ON d.menu_item_id = mim.menu_item_id
                )
                SELECT i.ingredients_id as IngredientID, i.name AS IngredientName, COALESCE(COUNT(iu.ingredients_id), 0) AS TimesUsed
                FROM ingredients i
                LEFT JOIN IngredientUsage iu ON i.ingredients_id = iu.ingredients_id
                GROUP BY i.ingredients_id, i.name
                ORDER BY TimesUsed DESC, IngredientName
            )
            SELECT
                IngredientID,
                IngredientName,
                TimesUsed
            FROM IngredientUsage iu
            JOIN ingredients i ON iu.IngredientID = i.ingredients_id
            WHERE (1.0 * iu.TimesUsed) / (iu.TimesUsed + i.availability) < 0.1
            ORDER BY iu.TimesUsed DESC;
        `, [startDate])
        .then(query_res => {
            const excess_report = query_res.rows;
            console.log(excess_report);
            res.json(excess_report);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve excess report');
        });
});

app.get('/restock_report_ingredients', (req, res) => {
    pool
        .query(`
            SELECT * from ingredients where availability < 30 order by availability asc;
        `)
        .then(query_res => {
            const restock_report = query_res.rows;
            console.log(restock_report);
            res.json(restock_report);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve restock report');
        });
});


app.get('/sales_together_report', (req, res) => {
    const startDate = req.query.start_date; // Get the start date from the query parameters
    const endDate = req.query.end_date; // Get the end date from the query parameters

    console.log(startDate);

    pool
        .query(`
            WITH PairedDrinks AS (
            SELECT
                d1.order_id,
                d1.menu_item_id AS menu_item_id1,
                d2.menu_item_id AS menu_item_id2
            FROM drink d1
            JOIN drink d2 ON d1.order_id = d2.order_id AND d1.menu_item_id < d2.menu_item_id
            JOIN orders o ON d1.order_id = o.order_id
            WHERE o.date BETWEEN $1 AND $2
            )
            SELECT
                p.menu_item_id1,
                mi1.name AS menu_item_name1,
                p.menu_item_id2,
                mi2.name AS menu_item_name2,
                COUNT(*) AS frequency
            FROM PairedDrinks p
            JOIN menu_item mi1 ON p.menu_item_id1 = mi1.menu_item_id
            JOIN menu_item mi2 ON p.menu_item_id2 = mi2.menu_item_id
            GROUP BY p.menu_item_id1, mi1.name, p.menu_item_id2, mi2.name
            ORDER BY frequency DESC
            LIMIT 30;
        `, [startDate, endDate])
        .then(query_res => {
            const sales_report = query_res.rows;
            console.log(sales_report);
            res.json(sales_report);
        })
        .catch(error => {
            console.error('Database query failed:', error);
            res.status(500).send('Failed to retrieve sales report');
        });

});
