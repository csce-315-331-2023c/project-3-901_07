import React, { useState, useEffect } from "react";

function ToppingsAndIngredients() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response_ingredients = await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/ingredients",
        {
          mode: "cors",
        }
      );
      const ingredientsData = await response_ingredients.json();

      const response_toppings = await fetch(
        process.env.REACT_APP_WEB_SERVER_ADDRESS + "/topping",
        {
          mode: "cors",
        }
      );
      const toppingsData = await response_toppings.json();
      setItems([...ingredientsData, ...toppingsData]);
    }

    fetchData();
  }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]);
  return <div>test</div>;
}

export default ToppingsAndIngredients;
