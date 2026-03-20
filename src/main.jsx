import { StrictMode } from 'react'
// aviso de errores o malas practicas
import { createRoot } from 'react-dom/client'
// createRoot → Busca el id="root" en el index.html y ahi funciona la app 
import { BrowserRouter } from 'react-router-dom'
// maneja las rutas del app router 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//  Client -> Maneja la memoria y los pedidos del API
// Provider -> Envuelve la app para que todos los componentes puedan usar React Query
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
// Para las notificaciones de si salio bien o mal una funcionalidad
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                background: '#FFCC00',
                color: '#2C2C2C',
                fontWeight: 'bold',
              }
            },
            error: {
              style: {
                background: '#EF4444',
                color: '#ffffff',
                fontWeight: 'bold',
              }
            }
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
// se importa los colores de acierto y error en toda la pagina desde su funcionalidad