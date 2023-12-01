import React, { useState, useEffect } from "react";
import ToppingCard from "../toppingcard";
import noIceImage from "../../../../assets/images/noice.png";
import lessIceImage from "../../../../assets/images/lessice.png";
import normalIceImage from "../../../../assets/images/normalice.png";
import "./styles.css";

function DrinkModal({
  toggleModal,
  selectedDrink,
  toppings,
  cart,
  setCart,
  drinkEdited,
  setDrinkToEdit,
  currView
}) {
  const [sugarLevel, setSugarLevel] = useState(null);
  const [iceLevel, setIceLevel] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(selectedDrink.price);

  function addDrinkToCart() {
    if (sugarLevel === null) {
      alert("Please select a sugar level");
    } else if (iceLevel === null) {
      alert("Please select an ice level");
    } else {
      const drink = {
        drink: selectedDrink,
        sugarLevel: sugarLevel,
        iceLevel: iceLevel,
        toppings: selectedToppings,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      console.log(drink);
      setCart((prevList) => [...prevList, drink]);
      toggleModal();
    }
  }

  function editDrinkInCart() {
    const drink = {
      drink: selectedDrink,
      sugarLevel: sugarLevel,
      iceLevel: iceLevel,
      toppings: selectedToppings,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    };
    cart[drinkEdited.index] = drink;
    setCart(cart);
    toggleModal();
  }

  useEffect(() => {
    function checkIfModalisEdit() {
      if (drinkEdited !== null) {
        setSugarLevel(drinkEdited.sugarLevel);
        setIceLevel(drinkEdited.iceLevel);
        setSelectedToppings(drinkEdited.toppings);
        setTotalPrice(drinkEdited.totalPrice);
      }
    }
    checkIfModalisEdit();
  }, [] );

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="drink-modal-content">
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <h2>{selectedDrink.name}</h2>
        <div className="drink-modal-row-content">
          <div className="drink-modal-left-panel">
            <ModalLevelSectionIce
              title="Ice Level"
              activeValue={iceLevel}
              setActiveValue={setIceLevel}
            />
            <ModalLevelSectionSugar
              title="Sugar Level"
              activeValue={sugarLevel}
              setActiveValue={setSugarLevel}
            />
            <h3 className="topping-header">Toppings</h3>
            <ToppingsSection
              toppings={toppings}
              selectedToppings={selectedToppings}
              setSelectedToppings={setSelectedToppings}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              currView={currView}
            />
          </div>
          <div className="drink-modal-right-panel">
            <div className="drink-order-panel">
              <h4>Drink</h4>
              <div className="middle-section">
                <div className="drink-item-card">
                  <div className="drink">
                    <p className="name">{selectedDrink.name}</p>
                    <p className="price">${selectedDrink.price}</p>
                  </div>
                  {sugarLevel !== null ? (
                    <div className="drink-attribute">
                      <p className="name">{sugarLevel}% Sugar</p>
                      <p className="price">$0.00</p>
                    </div>
                  ) : null}
                  {iceLevel !== null ? (
                    <div className="drink-attribute">
                      <p className="name">{iceLevel}</p>
                      <p className="price">$0.00</p>
                    </div>
                  ) : null}
                  {selectedToppings.map((topping, index) => (
                    <div className="drink-attribute">
                      <p className="name">{topping.name}</p>
                      <p className="price">${topping.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <span className="divider"></span>
              <div className="bottom-section">
                <p>Total Cost: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            {console.log("DRINK EDITED: " + drinkEdited)}
            {drinkEdited === null ? (
              <button
                className="leftpanel-checkout-button"
                onClick={addDrinkToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button className="leftpanel-checkout-button" onClick={editDrinkInCart}>
                Edit Drink
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToppingsSection({
  toppings,
  selectedToppings,
  setSelectedToppings,
  totalPrice,
  setTotalPrice,
  currView
}) {
  // console.log(toppings);
  // console.log(selectedToppings);
  function handleToppingClick(topping) {
    // console.log(topping.name);
    // This function toggles the selection of a topping.
    // If the topping is already selected, it removes it from the list; otherwise, it adds it.
    setSelectedToppings((prevSelected) => {
      console.log(prevSelected);
      if (prevSelected.includes(topping)) {
        setTotalPrice(totalPrice - topping.price);
        return prevSelected.filter((t) => t !== topping); // Deselect it
      } else {
        setTotalPrice(totalPrice + topping.price);
        return [...prevSelected, topping]; // Select it
      }
    });
  }


  let toppingscontainer = "toppings-container ";
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
  toppingscontainer += viewSuffix;

  return (
    <div className="toppings-section">
      <div className={toppingscontainer}>
        {toppings.map((topping, index) => (
          <div>
            <ToppingCard
              topping={topping}
              toppingClick={() => handleToppingClick(topping)}
              key={topping.name}
              isActiveEdit={selectedToppings.some(
                (toppings) => toppings.name === topping.name
              )}
              currView={currView}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalLevelSectionSugar({ title, activeValue, setActiveValue }) {
  function handleLinkClick(categoryPressed) {
    // Code to execute when the link is clicked
    // console.log(categoryPressed);
    setActiveValue(categoryPressed);
  }

  return (
    <div className="sugar-section">
      <div className="title">
        <h3>
          Sugar
          <br />
          Level
        </h3>
      </div>

      <div className="level-selection-section-sugar">
        {[0, 20, 50, 70, 100].map((value) => (
          <button
            onClick={() => handleLinkClick(value)}
            key={value}
            className={activeValue === value ? "active" : ""}
          >
            {value}%
          </button>
        ))}
      </div>
    </div>
  );
}

function ModalLevelSectionIce({ title, activeValue, setActiveValue }) {
  function handleLinkClick(categoryPressed) {
    // Code to execute when the link is clicked
    // console.log(categoryPressed);
    setActiveValue(categoryPressed);
  }

  return (
    <div className="ice-section">
      <div className="title">
        <h3>
          Ice <br /> Level
        </h3>
      </div>
      <div className="level-selection-section-ice">
        {[
          ["No Ice", noIceImage],
          ["Less Ice", lessIceImage],
          ["Normal Ice", normalIceImage],
        ].map((value) => (
          <button
            onClick={() => handleLinkClick(value[0])}
            key={value[0]}
            className={activeValue === value[0] ? "active" : ""}
          >
            {value[0]}
            <img
              className="ice-level-image"
              src={value[1]}
              alt="Default Drink"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrinkModal;
