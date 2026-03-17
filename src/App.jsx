import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
 // donde estan las rutas es routes 
 // route que seccion o componente se mostrara 
 
function App() {
  return (
    <Routes>
     
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App