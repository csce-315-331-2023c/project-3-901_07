import "./styles.css";
import React, { useState } from "react";
import defaultToppingImage from "../../../../assets/images/boba.png";

function ToppingCard({ topping, toppingClick }) {
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    console.log("toggleActiveClass called");
    console.log(isActive);
    setIsActive(!isActive);
  };
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
