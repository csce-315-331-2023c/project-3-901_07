import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import Menu from "./Menu";
import Weather from "./scenes/components/weather";
import ImageCarousel from "./scenes/Home/components/carousel";
import NavigationBar from "./scenes/Home/components/LandingNav";
import Landing from "./scenes/Home/Landing";


const router = createBrowserRouter([
  {
    path: "/",
    children:[
      {
        path: "",
        element: <Landing/>,
      },
      {
        path: "/App",
        element: <App/>
      },
      {
        path: "/Weather",
        element: <Weather/>
      },
      {
        path: "/Menu",
        element: <Menu/>
      },
      {
        path: "/Nav",
        element: <NavigationBar/>
      },
      {
        path: "/Car",
        element: <ImageCarousel/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);