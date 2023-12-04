import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import Menu from "./Menu";
import Weather from "./scenes/components/weather";
import Trends from"./scenes/Trends";
import ImageCarousel from "./scenes/Home/components/carousel";
import NavigationBar from "./scenes/Home/components/LandingNav";
import Landing from "./scenes/Home/Landing";
import Management from "./scenes/Management";


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
        path:"/Trends",
        element: <Trends/>
      },
      {
        path:"/Management",
        element: <Management/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);