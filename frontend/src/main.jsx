import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import store from "./redux/store";

import { Toaster } from "react-hot-toast";

// Global Styles
import "./index.css";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/scrollbar.css";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <AuthProvider>
          <App />
        </AuthProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid #334155",
            },
          }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
