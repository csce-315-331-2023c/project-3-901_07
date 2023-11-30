import React, { useEffect, useState } from "react";
import './Menu.css';
function Menu() {
  const [drinkAndToppingData, setdrinkAndToppingData] = useState(false);
  const webServerAddress = process.env.REACT_APP_WEB_SERVER_ADDRESS;
  useEffect(() => {
    async function fetchData() {
      try {
        const response_drink = await fetch(webServerAddress + "/menu_item", {
          mode: "cors",
        });
        console.log(response_drink);
        const drink_data = await response_drink.json();

        const response_topping = await fetch(webServerAddress + "/topping", {
          mode: "cors",
        });
        const topping_data = await response_topping.json();

        const formattedData = {
          menu_items: drink_data,
          toppings: topping_data,
        };
        setdrinkAndToppingData(formattedData);
      } catch {
        //console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);


  

  return (
    <div>
        <p>Hello, World!</p>
        {drinkAndToppingData &&
        Object.entries(drinkAndToppingData.menu_items).map(([category, items]) => (
          <div id={category} key={category}>
            <h3>{category}</h3>
            <div>
              {items.map((item) => (
                <div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Menu;