import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import DrinkCard from './components/drinkcard';



/**
 * Represents a panel displaying drink categories and their respective cards.
 * @param {Object} props - Properties passed to the component.
 * @param {boolean} props.isClicked - Indicates whether a category is clicked.
 * @param {Function} props.handleLinkClick - Function to handle link click events.
 * @param {Function} props.toggleModal - Function to toggle the modal.
 * @returns {JSX.Element} JSX Element representing the DrinkPanel component.
 */
function DrinkPanel({ isClicked, handleLinkClick, toggleModal}) {
  const targetElementRef = useRef(null);
  const [data, setData] = useState(null); // Initialize data state as null
    

    //Retrieve Drink Data
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://shareteawebapp.onrender.com/menu_item', {mode:'cors'});
          // const response = await fetch('http://localhost:5000/name', {mode:'cors'});
          const data = await response.json();
          console.log({ data })
          setData(data);
        }
        catch {
          console.log("error");
        }
      }
      fetchData();
      
    }, []);

    

  return (
    <div className="drinkpanel">
      <div ref={targetElementRef} id="test" className="drinkpanel-category" onClick={toggleModal}>
        <h3>Unordered List of Drinks</h3>
        <div className="drink-cards" >
          {data && data.menu_items.map(item => (
            <div key={item.menu_item_id}>
            <DrinkCard toggleModal={toggleModal} drinkProperties = {item}/>
            </div>
          ))}
          </div>
      </div>
      <div ref={targetElementRef} id="milktea" className="drinkpanel-category" onClick={toggleModal}>
        <h3>Milk Tea</h3>
        <div className="drink-cards">
          {/* <DrinkCard toggleModal={toggleModal}/>
          <DrinkCard /> */}
          
        </div>
      </div>
      <div ref={targetElementRef} id="thaitea" className="drinkpanel-category">
        Thai Tea
      </div>
      <div id="coffee" className="drinkpanel-category">
        Coffee
      </div>
    </div>
  );
}

export default DrinkPanel;
