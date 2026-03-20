import { Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import FormularioPokemon from './pages/FormularioPokemon'
import HomePage from './features/pokemon/pages/HomePage'
import PokemonDetailPage from './features/pokemon/pages/PokemonDetailPage'
import PostsPage from './features/posts/pages/PostsPage'
import PostDetailPage from './features/posts/pages/PostDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      <Route path="/formulario" element={<FormularioPokemon />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
    </Routes>
  )
}

export default App