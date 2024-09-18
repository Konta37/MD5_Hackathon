import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProductContext from "./providers/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductContext>
      <App />
    </ProductContext>
  </StrictMode>
);
