import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import Landing from "./Landing";
import Menu from "./Menu";
import Weather from "./scenes/components/weather";

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
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);