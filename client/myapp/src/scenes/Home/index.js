import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import DrinkModal from "./components/drinkmodal";
import DrinkCard from "./components/drinkcard";

function Home({ webServerAddress}) {
  const [isClicked, setIsClicked] = useState("test");
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null); // Initialize data state as null

  //Retrieve Drink Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(webServerAddress + "/menu_item", {
          mode: "cors",
        });
        // const response = await fetch('http://localhost:5000/name', {mode:'cors'});
        const data = await response.json();
        // console.log({ data });
        const formattedData = { menu_items: data };
        setData(formattedData);
      } catch {
        console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);

  //modal
  const toggleModal = () => {
    console.log("toggle modal");
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

  return (
    <div className="row content">
      <LeftPanel isClicked={isClicked} handleLinkClick={handleLinkClick} data = {data} />
      <span className="panel-divider"></span>
      <DrinkPanel
        isClicked={isClicked}
        handleLinkClick={handleLinkClick}
        toggleModal={toggleModal}
        data={data}
      />
      {modal && <DrinkModal toggleModal={toggleModal} />}
    </div>
  );
}

function LeftPanel({ isClicked, handleLinkClick, data }) {
  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Categories</div>
          {data &&
            Object.entries(data.menu_items).map(([category, items]) => (
              <li key= {category} >
                <a onClick={() => handleLinkClick(category)} href={`#${category}`}>
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
      <div className="leftpanel-order-component"></div>
      <button className="leftpanel-checkout-button">Checkout</button>
    </div>
  );
}

function DrinkPanel({ isClicked, handleLinkClick, toggleModal, data }) {
  const targetElementRef = useRef(null);

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
                <DrinkCard toggleModal={toggleModal} drinkProperties={item} key={item.name} />
              ))}
            </div>
          </div>
        ))}
        <div className="fill-gap">
        </div>
    </div>
  );
}

export default Home;
