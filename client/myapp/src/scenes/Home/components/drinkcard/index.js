import "./styles.css";
import React, { useState } from "react";
import defaultDrinkImage from "../../../../assets/images/drinks/defaultdrinkimage.png";

function DrinkCard({ toggleModal, drinkProperties, currView }) {
  // console.log(`${drinkProperties.name.toLowerCase()}.png`);
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
  
  console.log(drinkProperties)

  return (
    <div className={drinkcard} onClick={toggleModal}>
      {currView === "customer" && ( // Render image only if currView is "customer"
        <img
          className="drinkcard-image"
          src={getDrinkImage()}
          alt="Default Drink"
        />
      )}
      <div className={drinkcardcontent}>
        <div className={drinkcardname}>{drinkProperties.name}</div>
        <div className={drinkcardprice}>${drinkProperties.price}</div>
      </div>
    </div>
  );
}

export default DrinkCard;
