import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
// import DrinkTable from "../DrinkTable";

function Drinks() {
    
    const [drinks, setDrinks] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [confirmDeleteOverlay, setConfirmDeleteOverlay] = useState(false);
    const [changePriceOverlay, setChangePriceOverlay] = useState(false);
    const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);
    const [newPrice, setNewPrice] = useState('');


    const [addDrinkOverlay, setAddDrinkOverlay] = useState(false);
    const [drinkName, setDrinkName] = useState('');
    const [drinkPrice, setDrinkPrice] = useState('');
    const [drinkType, setDrinkType] = useState('');


    useEffect(() => {
        fetchDrinksData();
    }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]); 


    const handleViewDetails = (drink) => {
        setSelectedDrinkDetails(drink);
        setShowOverlay(true);
    };

    const fetchDrinksData = async () => {
        try {
            const response_drink = await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/menu_item", {
              mode: "cors",
            });
            const drink_data = await response_drink.json();
            setDrinks(drink_data);
        } catch {
            console.log("error fetching drink data");
        }
    };

    const updatePrice = async () => {
        // Validate that newPrice is a positive number
        const priceValue = parseFloat(newPrice);
        if (!isNaN(priceValue) && priceValue > 0) {
            await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/set_drink_price", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  drink_id: selectedDrinkDetails.menu_item_id,
                  new_price: newPrice,
                }),
            });
            setChangePriceOverlay(false);    
            fetchDrinksData(); // Re-fetch drinks data after successful update    
        } else {
            console.log(priceValue);
            console.log("test");
            console.error('Invalid price entered');
        }
           
    };

    const deleteDrink = async () => {
        fetch(`${process.env.REACT_APP_WEB_SERVER_ADDRESS}/delete_menu_item/${selectedDrinkDetails.menu_item_id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); // Output: Menu item deleted successfully
                setConfirmDeleteOverlay(false);
                fetchDrinksData();
            })
            .catch(error => {
                console.error('Error deleting menu item:', error);
            });

    };

    const createDrink = async () => {
        // Validate that newPrice is a positive number
        console.log(drinkPrice)
        const priceValue = parseFloat(drinkPrice);
        if (!isNaN(priceValue) && priceValue > 0) {
            await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/add_new_menu_item", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: drinkName,
                  price: priceValue,
                  type: drinkType || "Milk Tea"
                }),
            }).then(data =>{
                setAddDrinkOverlay(false);   
                setDrinkName("");
                setDrinkPrice("");
                setDrinkType(""); 
                fetchDrinksData(); 
            }); 
        } else {
            console.error('Invalid price entered' + priceValue);
        }
    }

    return (
        <div className = "management-container">
            <h2>Creama</h2>
            <DrinkTable drinks={drinks ? drinks.Creama : []} handleViewDetails={handleViewDetails}/>
            <h2>Fresh Milk</h2>
            <DrinkTable drinks={drinks ? drinks["Fresh Milk"] : []} handleViewDetails={handleViewDetails}/>
            <h2>Fruit Tea</h2>
            <DrinkTable drinks={drinks ? drinks["Fruit Tea"] : []} handleViewDetails={handleViewDetails}/>
            <h2>Ice Blend</h2>
            <DrinkTable drinks={drinks ? drinks["Ice Blend"] : []} handleViewDetails={handleViewDetails}/>
            <h2>Milk Tea</h2>
            <DrinkTable drinks={drinks ? drinks["Milk Tea"] : []} handleViewDetails={handleViewDetails}/>
            <h2>Mojito</h2>
            <DrinkTable drinks={drinks ? drinks.Mojito : []} handleViewDetails={handleViewDetails}/>
            <button onClick={() => setAddDrinkOverlay(true)} className="management-button">Add New Drink</button>
            {showOverlay && (
            <div className="management-overlay">
                <div className="management-overlay-content">
                    <div classame="management-overlay-top">
                        <button onClick={() => setShowOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                        <h2 className="management-title">{selectedDrinkDetails.name}</h2>
                    </div>
                    <div className="price-edit-container">
                        <h3>Price: {selectedDrinkDetails.price}</h3>
                        <h3>Category: {selectedDrinkDetails.type}</h3>
                    </div>
                    <button onClick={() => { setChangePriceOverlay(true); setShowOverlay(false); }} className="management-button management-card-button">Edit Price</button>
                    <br></br>
                    <button onClick={() => { setConfirmDeleteOverlay(true); setShowOverlay(false); }}className="management-button management-card-button">Delete Item</button>
                </div>
            </div>
            )}
            {changePriceOverlay &&(
                <div className="management-overlay">
                    <div className="management-overlay-content">
                        <div classname="management-overlay-top">
                            <button onClick={() => setChangePriceOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
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
                        <button onClick={() => updatePrice()}  className="management-button management-card-button">Apply</button>
                    </div>
                </div>
            )}
            {confirmDeleteOverlay &&(
                <div className="management-overlay">
                    <div className="management-overlay-content">
                        <div classname="management-overlay-top">
                            <button onClick={() => setConfirmDeleteOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
                            <h2 className="management-title">{selectedDrinkDetails.name}</h2>
                        </div>
                        <div className="price-edit-container">
                            <br></br>
                            <br></br>
                            <h3>Are you sure you want to delete {selectedDrinkDetails.name}?</h3>
                            <br></br>
                        </div>
                        
                        <button onClick={deleteDrink} className="management-button management-card-button">Delete</button>
                    </div>
                </div>
            )}

            {addDrinkOverlay && (
            <div className="management-overlay">
                <div className="management-overlay-content">
                    <div classname="management-overlay-top">
                        <button onClick={() => setAddDrinkOverlay(false)} className="signin-button management-overlay-close-button">Close</button>
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
                        <select value={drinkType} onChange={(e) => setDrinkType(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Creama">Creama</option>
                            <option value="Fresh Milk">Fresh Milk</option>
                            <option value="Fruit Tea">Fruit Tea</option>
                            <option value="Ice Blend">Ice Blend</option>
                            <option value="Milk Tea">Milk Tea</option>
                            <option value="Mojito">Mojito</option>
                        </select>
                    </div>
                    <button onClick={() => { setAddDrinkOverlay(false); createDrink()}} className="management-button management-card-button">Add Drink</button>
                </div>
            </div>
            )}

        </div>
    );
}


function DrinkTable({ drinks, handleViewDetails }) {

    return (
        <table className="drink-table">
            <tbody>
                {drinks.map((drink, index) => (
                    <tr key={index}>
                        <td className="drink-name">{drink.name}</td>
                        <td className="drink-actions">
                            <button onClick={() => handleViewDetails(drink)} className="management-button">View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Drinks;
