import React, { useEffect, useRef, useState } from "react";
import DrinkCard from "./components/drinkcard";
import DrinkModal from "./components/drinkmodal";
import waveanimation from "../../assets/images/waving-wave-hello.gif";

import dollaricon from "../../assets/images/dollaricon.png";
import carticon from "../../assets/images/cart.png";
import "./styles.css";
import { TextField } from "@mui/material";

function Home({ webServerAddress, currView, setCurrView }) {
  const [currCategory, setCategory] = useState(null);
  const [drinkModal, setDrinkModal] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [data, setData] = useState(null); // Initialize data state as null
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [drinkEdited, setDrinkToEdit] = useState(null);
  const [cart, setCart] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  //console.log("HOME COMPONENT : isScrollActive = " + isScrollActive);
  //Retrieve Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response_drink = await fetch(webServerAddress + "/menu_item", {
          mode: "cors",
        });
        console.log(response_drink);
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

        const response = await fetch(webServerAddress + "/success", {
          mode: "cors",
        });
        const data = await response.json();
        console.log("DATA");
        console.log(data);
        setUserName(data["displayName"]);
        setUserID(data["id"]);
        setUserEmail(data["emails"][0]["value"]);

        const responseEmployee = await fetch(webServerAddress + "/employee", {
          mode: "cors",
        });
        const employeeJson = await responseEmployee.json();
        setEmployeeData(employeeJson);

        const responseCustomer = await fetch(webServerAddress + "/customer", {
          mode: "cors",
        });
        const customerJson = await responseCustomer.json();
        setCustomerData(customerJson);
      } catch {
        //console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);

  // useEffect(() => {
  //   function setView() {
  //     if (employeeData) {
  //       const employeeArray = Object.values(employeeData);
  //       for (const employee of employeeArray) {
  //         if (employee.auth_token === userID) {
  //           const isManager = employee.manager;
  //           if (isManager === true) {
  //             setCurrView("manager");
  //           } else {
  //             console.log("view is cashier")
  //             setCurrView("cashier");
  //           }
  //           break;
  //         } else {
  //           console.log("view is customer")
  //           setCurrView("customer");
  //         }
  //       }
  //     }
  //   }
  //   setView();
  // }, [employeeData]);
  console.log("currView: " + currView);

  // FIXME: Adjust make_customer from server -> make sure this function work
  // useEffect(() => {
  //   async function setView() {
  //     const isUserExist = false;
  //     if (customerData){
  //       const customerArray = Object.values(customerData);
  //       for (const customer of customerArray) {
  //         if (customer.email === userEmail) {
  //           isUserExist = true;
  //           break;
  //         }
  //       }
  //       if (isUserExist == false){
  //         try {
  //           await fetch(webServerAddress + "/make_customer", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name: userName, // Replace with actual customer name if available
  //               auth_token: userID,
  //               email: userEmail,
  //             }),
  //           });

  //         } catch (error) {
  //           console.error("Checkout Error:", error);
  //         }
  //       }
  //     }
  //   }
  //   setView();
  // }, [customerData]);

  useEffect(() => {
    function setDrinkEditedDefault() {
      if (drinkModal === false) {
        setDrinkToEdit(null);
      }
    }
    setDrinkEditedDefault();
  }, [drinkModal]);

  //drinkModal
  const toggleDrinkModal = (drink) => {
    setSelectedDrink(drink); // Set the selected drink here
    setDrinkModal(!drinkModal);
  };

  //checkoutModal
  const toggleCheckoutModal = () => {
    setCheckoutModal(!checkoutModal);
  };
  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }
  var customerInfo = ["", "", ""];
  if (userName !== undefined && userName !== null) {
    customerInfo = [userName.split(" ")[0], userName.split(" ")[1], userEmail];
  }

  return (
    <div className="row content">
      <LeftPanel
        currCategory={currCategory}
        data={data}
        setCart={setCart}
        cart={cart}
        toggleDrinkModal={toggleDrinkModal}
        toggleCheckoutModal={toggleCheckoutModal}
        setDrinkToEdit={setDrinkToEdit}
        webServerAddress={webServerAddress}
      />
      <span className="panel-divider"></span>
      <DrinkPanel
        currCategory={currCategory}
        toggleModal={toggleDrinkModal}
        data={data}
        setCategory={setCategory}
        currView={currView}
      />
      {drinkModal && (
        <DrinkModal
          toggleModal={toggleDrinkModal}
          selectedDrink={selectedDrink}
          toppings={data.toppings}
          cart={cart}
          setCart={setCart}
          drinkEdited={drinkEdited}
          setDrinkToEdit={setDrinkToEdit}
          currView={currView}
        />
      )}
      {checkoutModal && (
        <CheckoutModal
          toggleCheckoutModal={toggleCheckoutModal}
          cart={cart}
          setDrinkToEdit={setDrinkToEdit}
          toggleDrinkModal={toggleDrinkModal}
          setCart={setCart}
          currView={currView}
          customerInfo={customerInfo}
          webServerAddress={webServerAddress}
        />
      )}
    </div>
  );
}

function CheckoutModal({
  toggleCheckoutModal,
  setCart,
  setDrinkToEdit,
  toggleDrinkModal,
  cart,
  currView,
  customerInfo,
  webServerAddress
}) {
  const [isActive, setIsActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // ["cash", "card"
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const [confirmOrderPressed, setConfirmOrderPressed] = useState(0);

  function deleteDrinkItem(indexToDelete) {
    setCart(cart.filter((_, index) => index !== indexToDelete));
  }

  function editDrinkItem(indexToEdit) {
    const drink = cart.find((_, index) => index === indexToEdit);
    drink["index"] = indexToEdit;
    setDrinkToEdit(drink);
    toggleDrinkModal(drink.drink);
  }

  // const printUsername = () => {
  //   console.log(firstNameRef.current.value);
  //   console.log(lastNameRef.current.value);
  // };

  // printUsername();
  console.log("Customer : ");
  console.log(customerInfo);
  const togglePayCashButton = () => {
    if (paymentMethod === "cash") {
      setPaymentMethod(null);
    } else {
      setPaymentMethod("cash");
    }
    setIsActive(!isActive);
  };

  function placeOrder() {
    setConfirmOrderPressed(confirmOrderPressed + 1);
    if (cart.length === 0) {
      toggleCheckoutModal();
      return;
    }
    if (paymentMethod === null) {
      alert("Please select a payment method");
      return;
    } else if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      !isValidEmail(emailRef.current.value)
    ) {
      return;
    }
    checkout();
    alert("Order placed successfully");
    setCart([]);
    setConfirmOrderPressed(0);
    toggleCheckoutModal();
  }

  function isValidEmail(email) {
    const emailRegex =
      /^[\w-.]+@(gmail\.com|yahoo\.com|hotmail\.com|example\.com|tamu\.edu|outlook\.com)$/i;
    return emailRegex.test(email);
  }

  function checkView() {
    if (currView === "cashier" || currView === "manager") {
      return "Customer Info";
    } else {
      return "Your Info";
    }
  }

  async function checkout() {
    // Make customer
    try {

      if(customerInfo[2] === ""){
        customerInfo = [firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value];
      }
      const fullName = customerInfo[0] + " " + customerInfo[1];
      // Check if user account is registered in table
      const customerExistResponse = await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS +
          "/check-customer-exist/" +
          customerInfo[2],
        {
          mode: "cors",
        }
      );
      const customerExistData = await customerExistResponse.json();
      console.log(customerExistData);

      if (customerExistData["exists"] === false) {
        // Create new customer account
        const postResponse = await fetch(
          process.env.REACT_APP_WEB_SERVER_ADDRESS + "/add_new_customer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: fullName,
              auth_token: null,
              email: customerInfo[2],
            }),
          }
        );
        const postMessage = await postResponse.json();
      }
      //get the customer id from the database
      const customerJSONResponse = await fetch(webServerAddress + "/get-customer-by-email/" + customerInfo[2])
      const customerData = await customerJSONResponse.json();
      const last_customer_id = customerData[0].customer_id;

      // make order

      const totalCost = cart.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const employee_id = 5; // FIXME
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      await fetch(webServerAddress + "/make_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: last_customer_id,
          employee_id: 5, // FIXME get real employee id
          date: formattedDate,
          price: totalCost,
          time: formattedTime,
        }),
      });

      const orderResponse = await fetch(webServerAddress + "/last_order");
      const orderData = await orderResponse.json();
      const last_order_id = orderData[0].order_id;

      // make drinks
      for (const drink of cart) {
        const menu_item_id = drink.drink.menu_item_id;
        const sweetness = drink.sugarLevel;
        const price = drink.totalPrice;
        const ice_level = drink.iceLevel;

        await fetch(webServerAddress + "/make_drink", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_item_id: menu_item_id,
            order_id: last_order_id,
            sweetness: sweetness,
            price: price,
            ice_level: ice_level,
          }),
        });

        const drinkResponse = await fetch(webServerAddress + "/last_drink");
        const drinkData = await drinkResponse.json();
        const last_drink_id = drinkData[0].drink_id;

        // make_drink_topping mapper
        for (const topping of drink.toppings) {
          const topping_id = topping.topping_id;

          await fetch(webServerAddress + "/make_drink_topping", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              drink_id: last_drink_id,
              topping_id: topping_id,
            }),
          });

          // update topping availability

          const toppingResponse = await fetch(
            webServerAddress + `/get_topping_by_id/${topping_id}`
          );
          const new_topping_data = await toppingResponse.json();
          const current_topping_availability = new_topping_data.availability;

          await fetch(webServerAddress + "/set_topping_availability", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              topping_id: topping_id,
              new_availability: current_topping_availability - 1,
            }),
          });
        }

        // update ingredients that are in the drink

        // get ingredients
        const pairResponse = await fetch(
          webServerAddress + `/get_menu_item_ingredients_by_id/${menu_item_id}`
        );
        const ingredients = await pairResponse.json();

        for (const row of ingredients) {
          const ingredientsResponse = await fetch(
            webServerAddress + `/get_ingredient_by_id/${row.ingredients_id}`
          );
          const ingredient = await ingredientsResponse.json();

          await fetch(webServerAddress + "/set_ingredient_availability", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ingredient_id: row.ingredients_id,
              new_availability: ingredient.availability - 1,
            }),
          });
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  }

  return (
    <div className="modal">
      <div
        className="checkout-modal-overlay"
        onClick={toggleCheckoutModal}
      ></div>
      <div className="checkout-modal-content">
        <button className="close-modal" onClick={toggleCheckoutModal}>
          CLOSE
        </button>
        <h2>Checkout</h2>
        <div className="checkout-modal-row-content">
          <div className="checkout-modal-left-panel">
            <div className="checkout-modal-info-card">
              <h3>{checkView()}</h3>
              <div className="textfield-section">
                <TextField
                  error={
                    firstNameRef.current.value === "" && confirmOrderPressed
                  }
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  defaultValue={currView === "customer" ? customerInfo[0] : ""}
                  helperText={
                    firstNameRef.current.value === "" && confirmOrderPressed
                      ? "Please enter first name"
                      : ""
                  }
                  inputRef={firstNameRef}
                />

                {/* <TextField
                  error
                  id="outlined-error-helper-text"
                  label="Error"
                  defaultValue="Hello World"
                  helperText="Incorrect entry."
                /> */}

                <TextField
                  error={
                    lastNameRef.current.value === "" && confirmOrderPressed
                  }
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  defaultValue={currView === "customer" ? customerInfo[1] : ""}
                  helperText={
                    lastNameRef.current.value === "" && confirmOrderPressed
                      ? "Please enter last name"
                      : ""
                  }
                  inputRef={lastNameRef}
                />
                <TextField
                  error={
                    (!isValidEmail(emailRef.current.value) &&
                      confirmOrderPressed) ||
                    (emailRef.current.value === "" && confirmOrderPressed)
                  }
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  defaultValue={currView === "customer" ? customerInfo[2] : ""}
                  helperText={
                    (!isValidEmail(emailRef.current.value) &&
                      confirmOrderPressed) ||
                    (emailRef.current.value === "" && confirmOrderPressed)
                      ? "Please enter a valid email"
                      : ""
                  }
                  inputRef={emailRef}
                />
              </div>
            </div>

            <div className="checkout-modal-payment-method-card">
              <h3>Payment Method</h3>
              <div className="payment-options-section">
                <div
                  className={`paycash-button ${isActive ? "active" : ""}`}
                  onClick={togglePayCashButton}
                >
                  <div>
                    <img src={dollaricon} alt="dollaricon" />
                  </div>
                  Pay with Cash
                </div>
              </div>

              <div className="tip-options-section"></div>
            </div>
          </div>
          <div className="checkout-modal-right-panel">
            <div className="checkout-order-panel">
              <h4>Cart</h4>
              <div className="middle-section">
                {Object.keys(cart).length !== 0 ? (
                  cart.map((drinkItem, index) => (
                    <div className="checkout-cart-component" key={index}>
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
                        <div style={{ flex: 1 }}></div>
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
                  {" "}
                  Total Cost: $
                  {parseFloat(
                    cart
                      .reduce((total, item) => total + item.totalPrice, 0)
                      .toFixed(2)
                  )}
                </p>
              </div>
            </div>
            <button className="leftpanel-checkout-button" onClick={placeOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftPanel({
  currCategory,
  data,
  setCart,
  cart,
  toggleDrinkModal,
  toggleCheckoutModal,
  setDrinkToEdit,
  webServerAddress,
}) {
  function deleteDrinkItem(indexToDelete) {
    setCart(cart.filter((_, index) => index !== indexToDelete));
  }

  function editDrinkItem(indexToEdit) {
    const drink = cart.find((_, index) => index === indexToEdit);
    drink["index"] = indexToEdit;
    setDrinkToEdit(drink);
    toggleDrinkModal(drink.drink);
  }

  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Categories</div>
          {data &&
            Object.entries(data.menu_items).map(([category, items]) => (
              <li key={category}>
                <a href={`#${category}`}>
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
        <h4>Cart</h4>
        <div className="middle-section">
          {cart.length === 0 ? (
            <div className="cartempty-div">
              <div>
                <img src={carticon} alt="carticon" />
              </div>
              <div>Your cart is empty</div>
            </div>
          ) : (
            <div></div>
          )}
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
                  <div style={{ flex: 1 }}></div>
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
      <button
        className="leftpanel-checkout-button"
        onClick={cart.length !== 0 ? toggleCheckoutModal : null}
      >
        Checkout
      </button>
    </div>
  );
}

function DrinkPanel({
  currCategory,
  toggleModal,
  data,
  setCategory,
  currView,
}) {
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
  // console.log("DATA: ");
  // console.log(data);

  let drinkcards = "drink-cards-";
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

  drinkcards += viewSuffix;

  return (
    <div className="drinkpanel">
      {data &&
        Object.entries(data.menu_items).map(([category, items]) => (
          <div id={category} className="drinkpanel-category" key={category}>
            <h3>{category}</h3>
            <div className={drinkcards}>
              {items.map((item) => (
                <div>
                  <DrinkCard
                    toggleModal={() => toggleModal(item)}
                    drinkProperties={item}
                    key={item.name}
                    currView={currView}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      <div className="fill-gap">
        <div className="waveanimation-container">
          <img src={waveanimation} alt="wave animation" />
        </div>
      </div>
    </div>
  );
}

export default Home;
