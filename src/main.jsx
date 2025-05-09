import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./store/apiStore.jsx";
import CustomSnackbar from "./components/Snackbar/Snackbar.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider>
      <App />
      <CustomSnackbar />
    </ApiProvider>
  </StrictMode>
);
