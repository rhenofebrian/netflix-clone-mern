import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse.jsx";
import App from "./pages/App.jsx";
import "./index.css";
import Watch from "./pages/Watch.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Browse />,
    path: "/browse",
  },
  {
    element: <Watch />,
    path: "/watch/:id",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <Login />,
    path: "/login",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
