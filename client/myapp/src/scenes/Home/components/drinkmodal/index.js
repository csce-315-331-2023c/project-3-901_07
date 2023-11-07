import React, { useState } from "react";
import "./styles.css";

function DrinkModal({ toggleModal }) {
  const [sugarLevel, setSugarLevel] = useState(null);
  const [iceLevel, setIceLevel] = useState(null);

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="drink-modal-content">
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <h2>Custom Drink</h2>
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
          </div>
          <div className="drink-modal-right-panel">
            <div className="drink-order-panel">
              <h4>Drink</h4>
              <div className="middle-section">
                <div className="drink-item-card">
                  <div className="drink">
                    <p className="name">Drink Name</p>
                    <p className="price">$x.xx</p>
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
                  <div className="drink-attribute">
                    <p className="name">sfdsf</p>
                    <p className="price">$x.xx</p>
                  </div>
                </div>
              </div>

              <span className="divider"></span>
              <div className="bottom-section">
                    <p>Total Cost: $x.xx</p>
              </div>
            </div>
            <button className="leftpanel-checkout-button">Add to Cart</button>
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
