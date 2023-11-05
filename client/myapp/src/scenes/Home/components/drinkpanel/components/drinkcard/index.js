// import React, { useState } from "react";
import "./styles.css";
import defaultDrinkImage from "../../../../../../assets/images/defaultdrinkimage.png";

function DrinkCard({toggleModal,drinkProperties}) {
    console.log(drinkProperties);
    const test = "test";
    return(
        <div className = "drinkcard">
            <img className="drinkcard-image" src={defaultDrinkImage} alt="Default Drink" />
            <div className = "drinkcard-name">
                {drinkProperties.name}
            </div>
            <div className = "drinkcard-price">
                ${drinkProperties.price}
            </div>

        </div>
    );

}

export default DrinkCard;