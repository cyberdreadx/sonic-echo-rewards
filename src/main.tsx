import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { AdminViewProvider } from './contexts/AdminViewContext'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AdminViewProvider>
      <App />
    </AdminViewProvider>
  </AuthProvider>
)
