import React, { useEffect, useRef, useState } from "react";
import DrinkCard from "./components/drinkcard";
import DrinkModal from "./components/drinkmodal";
import "./styles.css";

function Home({ webServerAddress }) {
  const [currCategory, setCategory] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null); // Initialize data state as null
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [drinkEdited, setDrinkToEdit] = useState(null);
  const [cart, setCart] = useState([]);

  //console.log("HOME COMPONENT : isScrollActive = " + isScrollActive);
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
        //console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);

  useEffect(() => {
    function setDrinkEditedDefault(){
      if (modal=== false) {
      setDrinkToEdit(null);
      }
    }
    setDrinkEditedDefault();
  }, [modal]);

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



  return (
    <div className="row content">
      <LeftPanel
        currCategory={currCategory}
        data={data}
        setCart={setCart}
        cart={cart}
        toggleModal={toggleModal}
        setDrinkToEdit={setDrinkToEdit}
      />
      <span className="panel-divider"></span>
      <DrinkPanel
        currCategory={currCategory}
        toggleModal={toggleModal}
        data={data}
        setCategory={setCategory}
      />
      {modal && (
        <DrinkModal
          toggleModal={toggleModal}
          selectedDrink={selectedDrink}
          toppings={data.toppings}
          cart={cart}
          setCart={setCart}
          drinkEdited={drinkEdited}
          setDrinkToEdit={setDrinkToEdit}
        />
      )}
    </div>
  );
}

function LeftPanel({
  currCategory,
  data,
  setCart,
  cart,
  toggleModal,
  setDrinkToEdit
}) {
  

  function deleteDrinkItem(indexToDelete) {
    setCart(cart.filter((_, index) => index !== indexToDelete));
  }

  function editDrinkItem(indexToEdit) {
    const drink = cart.find((_, index) => index === indexToEdit);
    drink["index"] = indexToEdit;
    setDrinkToEdit(drink);
    toggleModal(drink.drink);
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

                  href={`#${category}`}
                >
                  <div
                    className={
                      currCategory === category
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
              <div className="drink-cart-component" key={index}>
                <div className="drink">
                  <p className="name">{drinkItem.drink.name}</p>
                  <p className="price">${drinkItem.totalPrice}</p>
                </div>
                <div className="drink-cart-component-footer">
                <div
                    className="edit-drink-button"
                    onClick={() => editDrinkItem(index)}
                  >
                    Edit
                  </div>
                  <div style={{ flex: 1 }}>
                  </div>
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
          <p>
            Total Cost: $
            {parseFloat(
              cart
                .reduce((total, item) => total + item.totalPrice, 0)
                .toFixed(2)
            )}
          </p>
        </div>
      </div>
      <button className="leftpanel-checkout-button">Checkout</button>
    </div>
  );
}

function DrinkPanel({ currCategory , toggleModal, data, setCategory}) {
  const drinkPanelRef = useRef(null);
  useEffect(() => {
    const options = {
      root: drinkPanelRef.current, // Use the viewport as the root
      rootMargin: "0px 0px -75% 0px",
      threshold: 1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Current Category: ", entry.target.textContent);
          setCategory(entry.target.textContent);

        }
      });
    };

    if (data) {
      Object.entries(data.menu_items).forEach(([category]) => {
        const targetElement = document.getElementById(category);
        const h3Element = targetElement?.querySelector("h3"); // Select h3 element inside div
        if (h3Element) {
          const observer = new IntersectionObserver(observerCallback, options);
          observer.observe(h3Element);
          // Clean up by disconnecting the observer when component unmounts
          return () => {
            observer.unobserve(h3Element);
            observer.disconnect();
          };
        }
      });
    }
  }, [data, setCategory]);

  return (
    <div className="drinkpanel">
      {data &&
        Object.entries(data.menu_items).map(([category, items]) => (
          <div id={category} className="drinkpanel-category" key={category}>
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
