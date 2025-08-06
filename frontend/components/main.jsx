import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import '/src/index.css'
import App from './App.jsx';
import '../css/Signin.css';
import '../css/NavBar.css';
import '../css/CheckinForm.css';

import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
