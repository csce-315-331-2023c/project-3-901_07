import "./styles.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shareTeaLogo from "../../../../assets/images/logo.png";
const NavigationBar = () => {
  const [userName, setUserName] = useState(null);
  const [userID, setuserID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          process.env.REACT_APP_WEB_SERVER_ADDRESS + "/success",
          {
            mode: "cors",
          }
        );
        const data = await response.json();
        const fetchedUserName = data["displayName"];

        // Check if user account is registered in table
        const customerExistResponse = await fetch(
          process.env.REACT_APP_WEB_SERVER_ADDRESS +
            "/check-customer-exist/" +
            data["emails"][0]["value"],
          {
            mode: "cors",
          }
        );
        const customerExistData = await customerExistResponse.json();
        console.log(customerExistData);

        if (customerExistData["exists"] === false) {
          console.log("customer account does not exist");
          // Create new customer account
          const postResponse = await fetch(
            process.env.REACT_APP_WEB_SERVER_ADDRESS + "/add_new_customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: data["displayName"],
                auth_token: data["id"],
                email: data["emails"][0]["value"],
              }),
            }
          );
          const postMessage = await postResponse.json();
          console.log(postMessage);
          const responseData = await response.text(); // Get the response as text
          console.log(responseData);
        }
        if (customerExistData["exists"] === true) {
          const customerJSONResponse = await fetch(
            process.env.REACT_APP_WEB_SERVER_ADDRESS +
              "/get-customer-by-email/" +
              data["emails"][0]["value"]
          );
          const customerData = await customerJSONResponse.json();
          //if the custoemr email exist, howeever they haven't created an account with oauth, update customer data.
          if (customerData["auth_token"] === null) {
            const updateResponse = await fetch(
              process.env.REACT_APP_WEB_SERVER_ADDRESS +
                "/update_customer/" +
                data["emails"][0]["value"],
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: data["displayName"],
                  auth_token: data["id"],
                }),
              }
            );
            const updateMessage = await updateResponse.json();
          }
        }

        setUserName(fetchedUserName);
        setuserID(data["id"]);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [process.env.REACT_APP_WEB_SERVER_ADDRESS]);

  const handleSignOut = async () => {
    window.location.href = process.env.REACT_APP_WEB_SERVER_ADDRESS + "/logout";
  };

  const redirectToGoogleOAuth = () => {
    // Redirect to Google OAuth page
    window.location.href =
      process.env.REACT_APP_WEB_SERVER_ADDRESS + "/auth/google";
  };

  const navigate = useNavigate();

  const handleButtonClick = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/App");
        break;
      case 2:
        navigate("/Trends");
        break;
      case 3:
        navigate("/Menu");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const buttons = ["Home", "Order", "Trends", "MenuBoard"];

  return (
    <div className="nav-wrapper">
      <img className="landing-logo" src={shareTeaLogo} />
      <div className="navigation-bar">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="nav-button"
            onClick={() => handleButtonClick(index)}
          >
            {button}
          </div>
        ))}
      </div>
      <div className="nav-wrapper-right-section">
        <ul>
          {userName ? (
            <li>
              <button onClick={handleSignOut} className="signin-button">
                Sign Out ({userName})
              </button>
            </li>
          ) : (
            <li>
              <button onClick={redirectToGoogleOAuth} className="signin-button">
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
