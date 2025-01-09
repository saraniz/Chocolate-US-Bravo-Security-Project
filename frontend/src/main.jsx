import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HomePage />
    <Footer />
  </StrictMode>,
)
