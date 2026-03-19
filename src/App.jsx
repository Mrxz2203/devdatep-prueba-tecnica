import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import FormularioPokemon from './pages/FormularioPokemon'
import WelcomePage from './pages/WelcomePage'
 // donde estan las rutas es routes 
 // route que seccion o componente se mostrara 
 
function App() {
  return (
    <Routes>
     <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
       <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
       <Route path="/formulario" element={<FormularioPokemon/>}/>
    </Routes>
  )
}
// primera ruta la pagina principal
// segunda ruta el detalle completo del pokemon seleccionado

export default App