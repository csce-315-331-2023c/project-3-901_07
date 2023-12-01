import React, { useEffect, useState } from "react";
import './Menu.css';
import shareTeaLogo from './assets/images/sharetealogo.png';
import creamaImage from "./assets/images/drinks/coffee creama.png";
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
    <>
      {/* Top bar with logo and decorative element */}
      <div id="circle">
      <img className="logo" src={shareTeaLogo} alt="Share Tea Logo" />
      </div>
      <div className="nav-wrapper">
        <div className="nav-wrapper-left-section">
          {/* You can put additional elements here if needed */}
        </div>
        <div className="nav-wrapper-right-section">
          {/* You can put additional elements here if needed */}
        </div>
      </div>

      <div className="menu-board">
        {drinkAndToppingData &&
        Object.entries(drinkAndToppingData.menu_items).map(([category, items]) => {
          const isCreamaCategory = category.toLowerCase() === 'creama';
          return (
            <div className="menu-category" id={category.replace(/\s+/g, '-').toLowerCase()} key={category}>
              <h3>{category}</h3>
              {/* If the category is Creama, display the image */}
              {isCreamaCategory && (
                <div className="creama-image-container">
                  <img src={creamaImage} alt="Creama Beverage" className="creama-image" />
                </div>
              )}
              <div className="menu-category-items">
                {items.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Menu;