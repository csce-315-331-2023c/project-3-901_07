import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { lastDayOfQuarter, set } from "date-fns";
// import DrinkTable from "../DrinkTable";

/**
 * Component managing drinks and their details.
 * @returns {JSX.Element} Drinks component
 */
function Drinks() {
  const [drinks, setDrinks] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [confirmDeleteOverlay, setConfirmDeleteOverlay] = useState(false);
  const [changePriceOverlay, setChangePriceOverlay] = useState(false);
  const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const [addDrinkOverlay, setAddDrinkOverlay] = useState(false);
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState("");
  const [drinkType, setDrinkType] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showIngredientsOverlay, setShowIngredientsOverlay] = useState(false);

  const [addingNewDrink, setAddingNewDrink] = useState(false);

  useEffect(() => {
    fetchDrinksData();
    fetchToppingData();
  }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]);

  /**
   * Handler function to view details of a drink.
   * @param {Object} drink - Drink details
   * @returns {void}
   */
  const handleViewDetails = (drink) => {
    setSelectedDrinkDetails(drink);
    setShowOverlay(true);
  };

  /**
   * Function to fetch drink data from the server.
   * @returns {void}
   */
  const fetchDrinksData = async () => {
    try {
      const response_drink = await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/menu_item",
        {
          mode: "cors",
        }
      );
      const drink_data = await response_drink.json();
      setDrinks(drink_data);
    } catch {
      console.log("error fetching drink data");
    }
  };

  /**
   * Function to fetch topping data from the server.
   * @returns {void}
   */
  const fetchToppingData = async () => {
    const response_ingredients = await fetch(
      process.env.REACT_APP_WEB_SERVER_ADDRESS + "/ingredients",
      {
        mode: "cors",
      }
    );
    const ingredientsData = await response_ingredients.json();
    setIngredients(ingredientsData);
  };

  /**
   * Function to update the price of a drink.
   * @returns {void}
   */
  const updatePrice = async () => {
    // Validate that newPrice is a positive number
    const priceValue = parseFloat(newPrice);
    if (!isNaN(priceValue) && priceValue > 0) {
      await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/set_drink_price",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drink_id: selectedDrinkDetails.menu_item_id,
            new_price: newPrice,
          }),
        }
      );
      setChangePriceOverlay(false);
      fetchDrinksData(); // Re-fetch drinks data after successful update
    } else {
      console.log(priceValue);
      console.log("test");
      console.error("Invalid price entered");
    }
  };

  /**
   * Function to update the ingredients of a drink.
   * @param {Object} drink - Drink details
   * @param {Function} callback - Callback function
   * @returns {void}
   */
  const updateIngredients = async (drink, callback) => {
    // call /delete_menu_item_ingredients with drink_id
    console.log("updating ingredients of" + drink.name);
    console.log(selectedIngredients);
    console.log(selectedDrinkDetails);
    await fetch(
      process.env.REACT_APP_WEB_SERVER_ADDRESS +
        "/delete_menu_item_ingredients",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drink_id: drink.menu_item_id,
        }),
      }
    );
    console.log(selectedIngredients);

    // call /add_menu_item_ingredients with drink_id and ingredients_id for every ingredient in selectedIngredients
    selectedIngredients.forEach(async (ingredientName) => {
      const ingredient = ingredients.find(
        (item) => item.name === ingredientName
      );
      console.log(ingredient);
      await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/add_menu_item_ingredients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_item_id: drink.menu_item_id,
            ingredients_id: ingredient.ingredients_id,
          }),
        }
      );
    });

    setSelectedIngredients([]);
    callback();
  };

  /**
   * Function to delete a drink.
   * @returns {void}
   */
  const deleteDrink = async () => {
    fetch(
      `${process.env.REACT_APP_WEB_SERVER_ADDRESS}/delete_menu_item/${selectedDrinkDetails.menu_item_id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Output: Menu item deleted successfully
        setConfirmDeleteOverlay(false);
        fetchDrinksData();
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
      });
  };

  /**
   * Function to create a new drink.
   * @param {Function} callback - Callback function
   * @returns {void}
   */
  const createDrink = async (callback) => {
    // Validate that newPrice is a positive number
    setAddingNewDrink(false);
    console.log(drinkPrice);
    const priceValue = parseFloat(drinkPrice);
    if (!isNaN(priceValue) && priceValue > 0) {
      await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/add_new_menu_item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: drinkName,
            price: priceValue,
            type: drinkType || "Milk Tea",
          }),
        }
      ).then(async () => {
        console.log("1");
        const encodedDrinkName = encodeURIComponent(drinkName);
        const lastDrinkResponse = await fetch(
          `${process.env.REACT_APP_WEB_SERVER_ADDRESS}/get_menu_item_by_name?name=${encodedDrinkName}`,
          {
            method: "GET",
            mode: "cors",
          }
        );
        console.log("2");
        const lastDrinkData = await lastDrinkResponse.json();
        console.log(lastDrinkData);
        // Set the selected drink details to the last added drink
        console.log("updating drink" + selectedDrinkDetails);
        // Now update the ingredients for the new drink
        await updateIngredients(lastDrinkData, () => {
          // Close the overlay and perform any additional actions
          setShowIngredientsOverlay(false);
          setDrinkName("");
          setDrinkPrice("");
          setDrinkType("");
          fetchDrinksData();
          callback();
          if (callback) callback();
        });
      });
    } else {
      console.error("Invalid price entered" + priceValue);
    }
  };

  /**
   * Function to load selected ingredients for a drink.
   * @returns {void}
   */
  const loadSelectedIngredients = async () => {
    const mapping_response = await fetch(
      process.env.REACT_APP_WEB_SERVER_ADDRESS + "/menu-ingredients-mapper",
      {
        mode: "cors",
      }
    );
    const mapping = await mapping_response.json();
    const id = selectedDrinkDetails.menu_item_id;
    let filteredList = mapping
      .filter((item) => item.menu_item_id === id)
      .map((item) => item.ingredients_id);
    let selectedIngredientsNames = ingredients.filter((item) =>
      filteredList.includes(item.ingredients_id)
    );
    setSelectedIngredients(selectedIngredientsNames.map((item) => item.name));
    console.log(filteredList);

    // get all ingredients for drink, where mapping.menu_item_id = id
  };

  return (
    <div className="management-container">
      <h2>Creama</h2>
      <DrinkTable
        drinks={drinks ? drinks.Creama : []}
        handleViewDetails={handleViewDetails}
      />
      <h2>Fresh Milk</h2>
      <DrinkTable
        drinks={drinks ? drinks["Fresh Milk"] : []}
        handleViewDetails={handleViewDetails}
      />
      <h2>Fruit Tea</h2>
      <DrinkTable
        drinks={drinks ? drinks["Fruit Tea"] : []}
        handleViewDetails={handleViewDetails}
      />
      <h2>Ice Blend</h2>
      <DrinkTable
        drinks={drinks ? drinks["Ice Blend"] : []}
        handleViewDetails={handleViewDetails}
      />
      <h2>Milk Tea</h2>
      <DrinkTable
        drinks={drinks ? drinks["Milk Tea"] : []}
        handleViewDetails={handleViewDetails}
      />
      <h2>Mojito</h2>
      <DrinkTable
        drinks={drinks ? drinks.Mojito : []}
        handleViewDetails={handleViewDetails}
      />
      <button
        onClick={() => setAddDrinkOverlay(true)}
        className="management-button"
      >
        Add New Drink
      </button>
      {showOverlay && (
        <div className="management-overlay">
          <div className="management-overlay-content">
            <div classame="management-overlay-top">
              <button
                onClick={() => setShowOverlay(false)}
                className="signin-button management-overlay-close-button"
              >
                Close
              </button>
              <h2 className="management-title">{selectedDrinkDetails.name}</h2>
            </div>
            <div className="price-edit-container">
              <h3>Price: {selectedDrinkDetails.price}</h3>
              <h3>Category: {selectedDrinkDetails.type}</h3>
            </div>
            <button
              onClick={() => {
                setChangePriceOverlay(true);
                setShowOverlay(false);
              }}
              className="management-button management-card-button"
            >
              Edit Price
            </button>
            <button
              onClick={() => {
                setSelectedIngredients([]);
                setShowIngredientsOverlay(true);
                setShowOverlay(false);
                loadSelectedIngredients();
              }}
              className="management-button management-card-button"
            >
              Edit Ingredients
            </button>
            <button
              onClick={() => {
                setConfirmDeleteOverlay(true);
                setShowOverlay(false);
              }}
              className="management-button management-card-button"
            >
              Delete Item
            </button>
          </div>
        </div>
      )}
      {changePriceOverlay && (
        <div className="management-overlay">
          <div className="management-overlay-content">
            <div classname="management-overlay-top">
              <button
                onClick={() => setChangePriceOverlay(false)}
                className="signin-button management-overlay-close-button"
              >
                Close
              </button>
              <h2 className="management-title">{selectedDrinkDetails.name}</h2>
            </div>
            <div className="price-edit-container">
              <h3>Price: {selectedDrinkDetails.price}</h3>
              <h3>Category: {selectedDrinkDetails.type}</h3>
            </div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="management-textfield"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              helperText="Please enter a new price"
            />
            <button
              onClick={() => updatePrice()}
              className="management-button management-card-button"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {confirmDeleteOverlay && (
        <div className="management-overlay">
          <div className="management-overlay-content">
            <div classname="management-overlay-top">
              <button
                onClick={() => setConfirmDeleteOverlay(false)}
                className="signin-button management-overlay-close-button"
              >
                Close
              </button>
              <h2 className="management-title">{selectedDrinkDetails.name}</h2>
            </div>
            <div className="price-edit-container">
              <br></br>
              <br></br>
              <h3>
                Are you sure you want to delete {selectedDrinkDetails.name}?
              </h3>
              <br></br>
            </div>

            <button
              onClick={deleteDrink}
              className="management-button management-card-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {addDrinkOverlay && (
        <div className="management-overlay">
          <div className="management-overlay-content">
            <div classname="management-overlay-top">
              <button
                onClick={() => setAddDrinkOverlay(false)}
                className="signin-button management-overlay-close-button"
              >
                Close
              </button>
              <h2 className="management-title">New Drink</h2>
            </div>
            <div className="price-edit-container">
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="management-textfield"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                helperText="Drink Name"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="management-textfield"
                value={drinkPrice}
                onChange={(e) => setDrinkPrice(e.target.value)}
                helperText="Drink Price"
              />
            </div>
            <div>
              <select
                value={drinkType}
                onChange={(e) => setDrinkType(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Creama">Creama</option>
                <option value="Fresh Milk">Fresh Milk</option>
                <option value="Fruit Tea">Fruit Tea</option>
                <option value="Ice Blend">Ice Blend</option>
                <option value="Milk Tea">Milk Tea</option>
                <option value="Mojito">Mojito</option>
              </select>
            </div>
            <button
              onClick={() => {
                setAddDrinkOverlay(false);
                setAddingNewDrink(true);
                setShowIngredientsOverlay(true);
              }}
              className="management-button management-card-button"
            >
              Select Ingredients
            </button>
          </div>
        </div>
      )}

      {showIngredientsOverlay && (
        <div className="management-overlay">
          <div className="management-overlay-content management-ingredient-selection-overlay">
            <div classname="management-overlay-top">
              <button
                onClick={() => {
                  setShowIngredientsOverlay(false);
                  setAddingNewDrink(false);
                }}
                className="signin-button management-overlay-close-button"
              >
                Close
              </button>
              <h2 className="management-title">Edit Ingredients</h2>
            </div>
            <IngredientsTable
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
            <div className="management-footer-buttons">
              <button
                onClick={() => {
                  setShowIngredientsOverlay(false);
                  if (addingNewDrink) {
                    setShowIngredientsOverlay(false);
                    setAddDrinkOverlay(true);
                  } else {
                    setShowIngredientsOverlay(false);
                    setShowOverlay(true);
                  }
                }}
                className="management-button button-row-button"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setShowIngredientsOverlay(false);
                  if (addingNewDrink) {
                    createDrink(() => setShowIngredientsOverlay(false));
                  } else {
                    updateIngredients(selectedDrinkDetails, () =>
                      setShowOverlay(false)
                    );
                  }
                }}
                className="management-button button-row-button"
              >
                {addingNewDrink ? "Add Drink" : "Update Drink"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Functional component to render a table of drinks.
 * @param {Object} props - Component props
 * @param {Object[]} props.drinks - List of drinks
 * @param {Function} props.handleViewDetails - Function to handle viewing drink details
 * @returns {JSX.Element} DrinkTable component
 */
function DrinkTable({ drinks, handleViewDetails }) {
  return (
    <table className="drink-table">
      <tbody>
        {drinks.map((drink, index) => (
          <tr key={index}>
            <td className="drink-name">{drink.name}</td>
            <td className="drink-actions">
              <button
                onClick={() => handleViewDetails(drink)}
                className="management-button"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Functional component to render a table of ingredients for drink selection.
 * @param {Object} props - Component props
 * @param {Object[]} props.ingredients - List of ingredients
 * @param {string[]} props.selectedIngredients - List of selected ingredients
 * @param {Function} props.setSelectedIngredients - Function to set selected ingredients
 * @returns {JSX.Element} IngredientsTable component
 */
function IngredientsTable({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) {
  const handleIngredientClick = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((name) => name !== ingredientName)
      );
      console.log("removed " + ingredientName);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
      console.log("added " + ingredientName);
    }
  };

  return (
    <table className="drink-table">
      <h2>Select Ingredients:</h2>
      <br></br>
      <tbody>
        {ingredients.map((ingredient, index) => (
          <tr
            key={index}
            className={
              selectedIngredients.includes(ingredient.name)
                ? "selectedIngredient"
                : ""
            }
            onClick={() => handleIngredientClick(ingredient.name)}
          >
            <td className="drink-name">{ingredient.name}</td>
            <td className="drink-actions"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Drinks;
