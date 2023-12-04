import React, { useState, useEffect } from "react";
// import DrinkTable from "../DrinkTable";

function Drinks() {
    
    const [drinks, setDrinks] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);

    useEffect(() => {
        console.log(drinks); // This will log the updated state after it changes
    }, [drinks]);
    

    useEffect(() => {
        async function fetchData() {
          try {
            const response_drink = await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/menu_item", {
              mode: "cors",
            });
            console.log(response_drink);
            const drink_data = await response_drink.json();
            setDrinks(drink_data);
          } catch {
            console.log("error fetching drink data");
          }
        }
        fetchData();
      }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]);

    const handleViewDetails = (drink) => {
        setSelectedDrinkDetails(drink);
        setShowOverlay(true);
    };

    return (
        <div className = "management-container">
            <h2>Creama</h2>
            <DrinkTable drinks={drinks ? drinks.Creama : []} handleViewDetails={handleViewDetails}/>
            <h2>Fresh Milk</h2>
            <DrinkTable drinks={drinks ? drinks["Fresh Milk"] : []}/>
            <h2>Fruit Tea</h2>
            <DrinkTable drinks={drinks ? drinks["Fruit Tea"] : []}/>
            <h2>Ice Blend</h2>
            <DrinkTable drinks={drinks ? drinks["Ice Blend"] : []}/>
            <h2>Milk Tea</h2>
            <DrinkTable drinks={drinks ? drinks["Milk Tea"] : []}/>
            <h2>Mojito</h2>
            <DrinkTable drinks={drinks ? drinks.Mojito : []}/>
            {showOverlay && (
                <div className="management-overlay">
                    <div className="management-overlay-content">
                        <h2>{selectedDrinkDetails.name}</h2>
                        {/* ... more details ... */}
                        <button onClick={() => setShowOverlay(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}


function DrinkTable({ drinks, handleViewDetails, handelEditStock }) {


    const handleEditStock = (drink) => {
        console.log("Editing stock of", drink.name);
    };

    return (
        <table className="drink-table">
            <tbody>
                {drinks.map((drink, index) => (
                    <tr key={index}>
                        <td className="drink-name">{drink.name}</td>
                        <td className="drink-actions">
                            <button onClick={() => handleViewDetails(drink)} className="management-button">View Details</button>
                            <button onClick={() => handleEditStock(drink)} className="management-button">Edit Stock</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Drinks;
