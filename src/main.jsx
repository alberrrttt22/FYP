import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './router/AppRouter.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <AppWrapper />
  </AuthProvider>
  // </StrictMode>,  
)
