import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import Landing from "./Landing";

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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);