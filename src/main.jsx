import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse.jsx";
import App from "./pages/App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Browse />,
    path: "/browse",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
