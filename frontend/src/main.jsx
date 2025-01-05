import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Uncomment the page you want to render */}
    {/* <LoginPage /> */}
    <HomePage />
  </StrictMode>
);
