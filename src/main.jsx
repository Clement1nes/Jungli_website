import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { ShopifyProvider } from './context/ShopifyContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopifyProvider>
      <App />
    </ShopifyProvider>
  </StrictMode>,
)
