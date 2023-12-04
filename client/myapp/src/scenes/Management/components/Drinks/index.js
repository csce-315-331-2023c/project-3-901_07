import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { doesSectionFormatHaveLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
// import DrinkTable from "../DrinkTable";

function Drinks() {
    
    const [drinks, setDrinks] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [confirmDeleteOverlay, setConfirmDeleteOverlay] = useState(false);
    const [changePriceOverlay, setChangePriceOverlay] = useState(false);
    const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);
    const [newPrice, setNewPrice] = useState('');


    useEffect(() => {
        console.log(drinks); // This will log the updated state after it changes
    }, [drinks]);
    

    useEffect(() => {
        fetchDrinksData();
    }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]); // Dependency array


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
            })
            .catch(error => {
                console.error('Error deleting menu item:', error);
            });
            setConfirmDeleteOverlay(false);
            fetchDrinksData();
    };

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
            {showOverlay && (
            <div className="management-overlay">
                <div className="management-overlay-content">
                    <div classname="management-overlay-top">
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

        </div>
    );
}


function DrinkTable({ drinks, handleViewDetails, handelEditStock }) {

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
