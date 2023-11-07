import React, { useState } from "react";
import ToppingCard from "../toppingcard";
import "./styles.css";

function ToppingsSection({ toppings, selectedToppings, setSelectedToppings, totalPrice, setTotalPrice}) {
  console.log(toppings);
  function handleToppingClick(topping) {
    console.log(topping.name);
    // This function toggles the selection of a topping.
    // If the topping is already selected, it removes it from the list; otherwise, it adds it.
    setSelectedToppings(prevSelected => {
      console.log(prevSelected);
      if (prevSelected.includes(topping)) {
        setTotalPrice(totalPrice-topping.price);
        return prevSelected.filter(t => t !== topping); // Deselect it
      } else {
        setTotalPrice(totalPrice+topping.price);
        return [...prevSelected, topping]; // Select it
      }
    });
  }

  return (
    <div className="toppings-section">
      <h3>Toppings</h3>
      <div className="toppings-container">
        {toppings.map((topping, index) => (
          <ToppingCard topping={topping} toppingClick={() => handleToppingClick(topping)}/>
        ))}
      </div>
    </div>
  );
}

function addDrinkToCart(){

}

function DrinkModal({ toggleModal, selectedDrink, toppings}) {
  const [sugarLevel, setSugarLevel] = useState(null);
  const [iceLevel, setIceLevel] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(selectedDrink.price);



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
            <ModalLevelSection
              title="Sugar Level"
              activeValue={sugarLevel}
              setActiveValue={setSugarLevel}
            />
            <ModalLevelSection
              title="Ice Level"
              activeValue={iceLevel}
              setActiveValue={setIceLevel}
            />
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
                      <p className="name">{iceLevel}% Ice</p>
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
            <button className="leftpanel-checkout-button" onClick={addDrinkToCart()}>Add to Cart</button >
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalLevelSection({ title, activeValue, setActiveValue }) {
  function handleLinkClick(categoryPressed) {
    // Code to execute when the link is clicked
    console.log(categoryPressed);
    setActiveValue(categoryPressed);
  }

  return (
    <div className="modal-level-section">
      <div>
        <h3>
          {title.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              {word}
              <br />
            </React.Fragment>
          ))}
        </h3>
      </div>
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
  );
}

export default DrinkModal;
