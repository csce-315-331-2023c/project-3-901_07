import React, { useState } from "react";
import ToppingCard from "../toppingcard";
import noIceImage from "../../../../assets/images/noice.png";
import lessIceImage from "../../../../assets/images/lessice.png";
import normalIceImage from "../../../../assets/images/normalice.png";
import "./styles.css";

function DrinkModal({ toggleModal, selectedDrink, toppings, setCart }) {
  const [sugarLevel, setSugarLevel] = useState(null);
  const [iceLevel, setIceLevel] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(selectedDrink.price);

  function addDrinkToCart() {
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
            <button
              className="leftpanel-checkout-button"
              onClick={addDrinkToCart}
            >
              Add to Cart
            </button>
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

  return (
    <div className="toppings-section">
      <div className="toppings-container">
        {toppings.map((topping, index) => (
          <ToppingCard
            topping={topping}
            toppingClick={() => handleToppingClick(topping)}
            key={topping.name}
          />
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
