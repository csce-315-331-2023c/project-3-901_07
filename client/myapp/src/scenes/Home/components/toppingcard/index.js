import "./styles.css";
import React, { useState, useEffect } from "react";
import defaultToppingImage from "../../../../assets/images/boba.png";


/**
 * ToppingCard component displaying a topping card with its details.
 * @param {Object} props - Component props.
 * @param {Object} props.topping - Topping object containing name and price.
 * @param {Function} props.toppingClick - Function to handle topping card click.
 * @param {boolean} props.isActiveEdit - Flag indicating if the topping card is active for edit.
 * @param {string} props.currView - Current view type ('customer', 'manager', 'cashier').
 * @returns {JSX.Element} Topping card component JSX.
 */
function ToppingCard({ topping, toppingClick, isActiveEdit, currView }) {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    console.log("toggleActiveClass called");
    setIsActive(!isActive);
  };

  function getToppingImage() {
    try {
      const imagePath = require(`../../../../assets/images/toppings/${topping.name.toLowerCase()}.png`);
      return imagePath;
    } catch (err) {
      return defaultToppingImage;
    }
  }

  useEffect(() => {
    function checkIfToppingCardIsActive() {
      if (isActiveEdit) {
        setIsActive(true);
      }
    }
    checkIfToppingCardIsActive();
  }, [isActiveEdit]);

  let toppingcard = "toppingcard ";
  
  let viewSuffix = "";
  switch (currView) {
    case "customer":
      viewSuffix = "customer";
      break;
    case "cashier":
    case "manager":
      viewSuffix = "employee";
      break;
  }
  
  toppingcard += viewSuffix;
  

  return (
    <div
      className={`${toppingcard} ${isActive ? "active" : ""}`}
      onClick={() => {
        toppingClick();
        toggleActiveClass();
      }}
    >
      {currView === "customer" && ( // Render image only if currView is "customer"
        <img
          className="toppingcard-image"
          src={getToppingImage()}
          alt={topping.name}
        />
      )}
      <div className="topingcard-text">
        {topping.name} <br /> ${topping.price.toFixed(2)}
      </div>
    </div>
  );
}

export default ToppingCard;
