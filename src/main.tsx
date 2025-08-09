import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import "./styles/global.scss";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Router basename={import.meta.env.BASE_URL}>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
          }}
          containerStyle={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
        />
      </Router>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
