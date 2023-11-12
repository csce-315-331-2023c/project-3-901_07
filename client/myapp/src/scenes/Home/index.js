import React, { useEffect, useRef, useState } from "react";
import DrinkCard from "./components/drinkcard";
import DrinkModal from "./components/drinkmodal";
import "./styles.css";

function Home({ webServerAddress }) {
  const [isClicked, setIsClicked] = useState("test");
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null); // Initialize data state as null
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [cart, setCart] = useState([]);

  //Retrieve Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response_drink = await fetch(webServerAddress + "/menu_item", {
          mode: "cors",
        });
        const drink_data = await response_drink.json();

        const response_topping = await fetch(webServerAddress + "/topping", {
          mode: "cors",
        });
        const topping_data = await response_topping.json();

        const formattedData = {
          menu_items: drink_data,
          toppings: topping_data,
        };
        setData(formattedData);
      } catch {
        console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);

  //modal
  const toggleModal = (drink) => {
    setSelectedDrink(drink); // Set the selected drink here
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //category clicked
  function handleLinkClick(categoryPressed) {
    // Code to execute when the link is clicked
    // console.log(categoryPressed);
    setIsClicked(categoryPressed);
  }

  console.log("cart content");
  console.log(cart);

  return (
    <div className="row content">
      <LeftPanel
        isClicked={isClicked}
        handleLinkClick={handleLinkClick}
        data={data}
        setCart={setCart}
        cart={cart}
      />
      <span className="panel-divider"></span>
      <DrinkPanel
        isClicked={isClicked}
        handleLinkClick={handleLinkClick}
        toggleModal={toggleModal}
        data={data}
      />
      {modal && (
        <DrinkModal
          toggleModal={toggleModal}
          selectedDrink={selectedDrink}
          toppings={data.toppings}
          setCart={setCart}
        />
      )}
    </div>
  );
}

function LeftPanel({ isClicked, handleLinkClick, data, setCart, cart }) {
  function deleteDrinkItem(indexToDelete) {
    setCart(cart.filter((_, index) => index !== indexToDelete));

  }
  
  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Categories</div>
          {data &&
            Object.entries(data.menu_items).map(([category, items]) => (
              <li key={category}>
                <a
                  onClick={() => handleLinkClick(category)}
                  href={`#${category}`}
                >
                  <div
                    className={
                      isClicked === category
                        ? "leftpanel-category item active"
                        : "leftpanel-category item"
                    }
                  >
                    {category}
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="leftpanel-order-component">
        <h4>Order</h4>
        <div className="middle-section">
        {Object.keys(cart).length !== 0 ? (
  cart.map((drinkItem, index) => (
    <div key={index}>
      <div className="drink">
        <p className="name">{drinkItem.drink.name}</p>
        <p className="price">${drinkItem.totalPrice}</p>
      </div>
      <div>
        <div
          className="delete-drink-button"
          onClick={() => deleteDrinkItem(index)}
        >
          Delete
        </div>
      </div>
    </div>
  ))
) : (
  <div></div>
)}

        </div>
        <span className="divider"></span>
        <div className="bottom-section">
        <p>Total Cost: ${parseFloat(cart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2))}</p>

        </div>
      </div>
      <button className="leftpanel-checkout-button">Checkout</button>
    </div>
  );
}

function DrinkPanel({ isClicked, handleLinkClick, toggleModal, data }) {
  const targetElementRef = useRef(null);
  console.log(data);

  return (
    <div className="drinkpanel">
      {data &&
        Object.entries(data.menu_items).map(([category, items]) => (
          <div
            ref={targetElementRef}
            id={category}
            className="drinkpanel-category"
            key={category}
          >
            <h3>{category}</h3>
            <div className="drink-cards">
              {items.map((item) => (
                <DrinkCard
                  toggleModal={() => toggleModal(item)}
                  drinkProperties={item}
                  key={item.name}
                />
              ))}
            </div>
          </div>
        ))}
      <div className="fill-gap"></div>
    </div>
  );
}

export default Home;
