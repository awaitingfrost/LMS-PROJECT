import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './Context/AuthContext'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes } from 'react-router-dom';


ReactDOM.createRoot(
  document.getElementById("root"),
)
  .render(
    <React.StrictMode>
      <AuthContextProvider>
        <BrowserRouter>

          <App />
        </BrowserRouter>
      </AuthContextProvider>

    </React.StrictMode>,

  );

reportWebVitals();
