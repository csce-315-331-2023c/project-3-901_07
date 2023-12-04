import React, { useState, useEffect } from "react";

function Drinks() {
    
    const [drinks, setDrinks] = useState(null);

    useEffect(() => {
        async function fetchData() {
          try {
            const response_drink = await fetch(process.env.REACT_APP_WEB_SERVER_ADDRESS + "/menu_item", {
              mode: "cors",
            });
            console.log(response_drink);
            const drink_data = await response_drink.json();
            setDrinks(drink_data);
            console.log(drink_data)
            
          } catch {
            console.log("error fetching drink data");
          }
        }
        fetchData();
      }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]);

    
    return (
        <div className = "management-container">
            <h2>Creama</h2>
            <h2>Fresh Milk</h2>
            <h2>Fruit Tea</h2>
            <h2>Ice Blend</h2>
            <h2>Milk Tea</h2>
            <h2>Mojito</h2>
        </div>
    );
}

export default Drinks;
