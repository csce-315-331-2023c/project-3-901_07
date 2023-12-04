import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

function ToppingsAndIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState(null);
  const [changePriceOverlay, setChangePriceOverlay] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [confirmDeleteOverlay, setConfirmDeleteOverlay] = useState(false);
  const [editStockOverlay, setEditStockOverlay] = useState(false);

 

  useEffect(() => {
    fetchToppingData();
  }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]); 

  const handleViewDetails = (ingred) => {
    setSelectedIngredientDetails(ingred);
    setShowDetailsOverlay(true);
  };  

  const handleEditStock = (ingreds) => {
    setSelectedIngredientDetails(ingreds);
    setEditStockOverlay(true);
  };

  const fetchToppingData = async () => {
    const response_ingredients = await fetch(
      process.env.REACT_APP_WEB_SERVER_ADDRESS + "/ingredients",
      {
        mode: "cors",
      }
    );
    const ingredientsData = await response_ingredients.json();
    setIngredients(ingredientsData);

    const topping_ingredients = await fetch(
      process.env.REACT_APP_WEB_SERVER_ADDRESS + "/topping",
      {
        mode: "cors",
      }
    );
    const toppingData = await topping_ingredients.json();
    setToppings(toppingData);

  }

  const updatePrice = async () => {
    // Validate that newPrice is a positive number
    const priceValue = parseFloat(newPrice);
    if (!isNaN(priceValue) && priceValue > 0) {
        await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/set_topping_price", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              topping_id: selectedIngredientDetails.topping_id,
              new_price: newPrice,
            }),
        });
        setChangePriceOverlay(false);    
        fetchToppingData(); // Re-fetch drinks data after successful update    
    } else {
        console.error('Invalid price entered');
    }
       
};

const updateStock = async () => {
  const stockValue = parseInt(newStock);
  if (!isNaN(stockValue) && stockValue >= 0) {
    const endpoint = selectedIngredientDetails.price ? "/set_topping_availability" : "/set_ingredient_availability";
    const body = selectedIngredientDetails.price ? { topping_id: selectedIngredientDetails.topping_id, new_availability: newStock } : { ingredient_id: selectedIngredientDetails.ingredients_id, new_availability: newStock };
    await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setEditStockOverlay(false);
    fetchToppingData(); // Re-fetch drinks data after successful update
  } else {
    console.error('Invalid stock entered');
  }
};

const deleteIngredient = async () => {
  if (selectedIngredientDetails.price) {
    // Delete topping
    fetch(`${process.env.REACT_APP_WEB_SERVER_ADDRESS}/delete_topping/${selectedIngredientDetails.topping_id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    console.log("ingredients reached")
    // Delete ingredient
    fetch(`${process.env.REACT_APP_WEB_SERVER_ADDRESS}/delete_ingredient/${selectedIngredientDetails.ingredients_id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  fetchToppingData();
  setConfirmDeleteOverlay(false);
}

  return (
    <div className = "management-container">
      <h2>Drink Ingredients</h2>
      <IngredientsTable ingredients={ingredients}  handleViewDetails={handleViewDetails} handleEditstock={handleEditStock}/>
      <h2>Toppings</h2>
      <IngredientsTable ingredients={toppings}  handleViewDetails={handleViewDetails} handleEditstock={handleEditStock}/>
      {showDetailsOverlay && (
      <div className="management-overlay">
          <div className="management-overlay-content">
              <div classname="management-overlay-top">
                  <button onClick={() => setShowDetailsOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                  <h2 className="management-title">{selectedIngredientDetails.name}</h2>
              </div>
              <div className="price-edit-container">
                  {selectedIngredientDetails.price && <h3>Price: ${selectedIngredientDetails.price.toFixed(2)}</h3>}
                  <h3>Availability: {selectedIngredientDetails.availability}</h3>
              </div>
              {selectedIngredientDetails.price && (
                <button onClick={() => { setChangePriceOverlay(true); setShowDetailsOverlay(false);}} className="management-button management-card-button">Edit Price</button>
              )}
              <br></br>
              <button onClick={() => { setConfirmDeleteOverlay(true); setShowDetailsOverlay(false);}}className="management-button management-card-button">Delete Item</button>
          </div>
      </div>
      )}
      {/* Change Price Overlay */}
      {changePriceOverlay &&(
        <div className="management-overlay">
            <div className="management-overlay-content">
                <div classname="management-overlay-top">
                    <button onClick={() => setChangePriceOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                    <h2 className="management-title">{selectedIngredientDetails.name}</h2>
                </div>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="management-textfield"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    helperText="Please enter a new price"
                />
                <button onClick={() => updatePrice()}  className="management-button management-card-button">Apply</button>
            </div>
        </div>
      )}
      {/* Confirm Delete Overlay */}
      {confirmDeleteOverlay &&(
                <div className="management-overlay">
                    <div className="management-overlay-content">
                        <div classname="management-overlay-top">
                            <button onClick={() => setConfirmDeleteOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                            <h2 className="management-title">{selectedIngredientDetails.name}</h2>
                        </div>
                        <div className="price-edit-container">
                            <br></br>
                            <br></br>
                            <h3>Are you sure you want to delete {selectedIngredientDetails.name}?</h3>
                            <br></br>
                        </div>
                        
                        <button onClick={deleteIngredient} className="management-button management-card-button">Delete</button>
                    </div>
                </div>
      )}
      {/* Edit Stock Overlay */}
      { editStockOverlay && (
        <div className="management-overlay">
            <div className="management-overlay-content">
                <div classname="management-overlay-top">
                    <button onClick={() => setEditStockOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                    <h2 className="management-title">{selectedIngredientDetails.name}</h2>
                </div>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="management-textfield"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    helperText="Please enter the new stock amount"
                />
                <button onClick={() => updateStock()}  className="management-button management-card-button">Apply</button>
            </div>
          </div>
        )
      }
    </div>

  );


  
}

function IngredientsTable({ ingredients, handleViewDetails, handleEditstock }) {
  return (
      <table className="drink-table">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Availability</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {ingredients.map((ingredients, index) => (
                  <tr key={index}>
                      <td className="drink-name">{ingredients.name}</td>
                      <td className = "drink-name">{ingredients.availability}</td>
                      <td className="drink-actions">
                        <button onClick={() => handleEditstock(ingredients)} className="management-button">Edit Stock</button>
                        <button onClick={() => handleViewDetails(ingredients)} className="management-button">View Details</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
}

export default ToppingsAndIngredients;
