import "./styles.css";
import React, { useState } from "react";
import defaultDrinkImage from "../../../../assets/images/drinks/defaultdrinkimage.png";


/**
 * Represents a card component for displaying drink details.
 * @param {Object} props - Properties passed to the component.
 * @param {Function} props.toggleModal - Function to toggle the modal.
 * @param {Object} props.drinkProperties - Object containing drink properties like name and price.
 * @param {string} props.currView - Current view mode ("customer", "cashier", "manager").
 * @returns {JSX.Element} JSX Element representing the DrinkCard component.
 */
function DrinkCard({ toggleModal, drinkProperties, currView }) {
  // console.log(`${drinkProperties.name.toLowerCase()}.png`);
    /**
   * Retrieves the drink image path based on the drink's name.
   * @returns {string} Image path for the drink or default image path if not found.
   */
  function getDrinkImage() {
    try {
      const imagePath = require(`../../../../assets/images/drinks/${drinkProperties.name.toLowerCase()}.png`);
      return imagePath;
    } catch (err) {
      return defaultDrinkImage;
    }
  }


  let drinkcard = "drinkcard ";
  let drinkcardcontent = "drinkcard-content ";
  let drinkcardname = "drinkcard-name ";
  let drinkcardprice = "drinkcard-price ";
  
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
  
  drinkcard += viewSuffix;
  drinkcardcontent += viewSuffix;
  drinkcardname += viewSuffix;
  drinkcardprice += viewSuffix;
  


  return (
    <div className={drinkcard} onClick={toggleModal}>
      {currView === "customer" && ( // Render image only if currView is "customer"
        <img
          className="drinkcard-image"
          src={getDrinkImage()}
          alt={drinkProperties.name}
        />
      )}
      <div className={drinkcardcontent}>
        <div className={drinkcardname}>{drinkProperties.name}</div>
        <div className={drinkcardprice}>${drinkProperties.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default DrinkCard;
