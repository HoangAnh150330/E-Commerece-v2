import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
  <GoogleOAuthProvider clientId="268311004090-edli15qb3e6k05k4ri2ijlkt932afr7l.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>;
      
      <Toaster />
    </Provider>
  </BrowserRouter>
);
