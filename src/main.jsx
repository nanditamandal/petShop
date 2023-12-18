import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './context/MyContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    cacheLocation='localstorage'
    domain="dev-12r7z02m34l35mvg.us.auth0.com"
    clientId="N0erJpEumJaEe7d2MXVsY8xMzzyCPwZS"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
    <DataProvider>
   <App />
   </DataProvider>
    
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
