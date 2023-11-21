import "./styles.css";
import React, { useState, useEffect } from "react";
import defaultToppingImage from "../../../../assets/images/boba.png";

function ToppingCard({ topping, toppingClick, isActiveEdit }) {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    console.log("toggleActiveClass called");
    setIsActive(!isActive);
  };

useEffect(() => {
  function checkIfToppingCardIsActive(){
    if(isActiveEdit){
      setIsActive(true);
    }
  }
  checkIfToppingCardIsActive();
}, [isActiveEdit]);

  return (
    <div
      className={`toppingcard ${isActive ? "active" : ""}`}
      onClick={() => {
        toppingClick();
        toggleActiveClass();
      }}
    >
      <img
        className="toppingcard-image"
        src={defaultToppingImage}
        alt="Default Topping"
      />
      <div className="topingcard-text">
        {topping.name} <br /> ${topping.price}
      </div>
    </div>
  );
}

export default ToppingCard;
