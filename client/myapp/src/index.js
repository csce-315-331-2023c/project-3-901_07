import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import Menu from "./Menu";
import Weather from "./scenes/components/weather";
import Landing from "./scenes/Home/Landing";
import AB from "./scenes/Home/Landing/a";
import Trends from "./scenes/Trends";

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
        path:"/Test",
        element: <AB/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);