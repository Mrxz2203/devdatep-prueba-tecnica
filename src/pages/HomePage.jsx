import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePokemons, useAllPokemonNames, usePokemonDetail } from '../hooks/usePokemons'
import PokemonCard from '../components/PokemonCard'
import PokemonSkeleton from '../components/PokemonSkeleton'
import { useNavigate } from 'react-router-dom'

// Importa el uso de lucide react libreria para mejorar el aspecto visual
// search para buscar, x para limpiar, cheveron para izq y der, file para el texto
import { Search, X, ChevronLeft, ChevronRight, FileText, ArrowLeft } from 'lucide-react'
// Elegi el Api de pokemon por ser la mas practica 
// Se importa el uso del card y skeleton de pokemon
// search guarda y recibe el dato del pokemon pedido
// el submit maneja el formulario enviado 
function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0) // estado de pagina de cada uno de los pokemones
  const { register, handleSubmit } = useForm()

  const { data, isLoading } = usePokemons({ limit: 20, offset: page * 20 })

  const { data: allNames } = useAllPokemonNames() // agregado de busqueda de pokemones foneticamente

  const filteredNames = allNames?.filter((p) =>
    p.name.includes(search.toLowerCase().trim())
  ) ?? []
  // revisa si el texto buscado **está contenido** dentro del nombre

  const onSubmit = (values) => {
    setSearch(values.search.toLowerCase().trim())
  }

  const onClear = () => {
    setSearch('')
  }

  // las opciones de buscar y limpiar, de los botones del buscador 
  // Limite de 20 pokemones y search busca el pokemon
  const renderCards = () => {
    if (search) {
      if (filteredNames.length === 0) {
        return <p className="text-pika-brown col-span-full text-center font-semibold">No se encontró ningún pokémon.</p>
      }
      return filteredNames.map((poke) => (
        <PokemonDetailCard key={poke.name} name={poke.name} />
      ))
    }
    // si busca el pokemon, estará cargando y mostrara el skeleton
    // sino hay se arrojara que no hay ningun pokemon
    // cuando lo encuentre le retornara los campos de la variable (pokemon) buscado

    if (isLoading) {
      return Array.from({ length: 20 }).map((_, i) => <PokemonSkeleton key={i} />)
    }

    // se arroja 20 ids de pokemon cuando entras al homepage 
    return data?.results.map((poke) => (
      <PokemonDetailCard key={poke.name} name={poke.name} />
    ))
  }
// nuevo agregado de la pantalla con lucide react con fondo de pikachu para las secciones
  return (
    <div className="min-h-screen bg-pika-yellowLight px-4 py-8">
      {/* Header - actualizado con colores de pikachu */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <img src="/pokebola.png" alt="pokebola" className="w-10 h-10"/>
        <h1 className="text-4xl font-bold text-pika-dark">PokéApp</h1>
        <img src="/pokebola.png" alt="pokebola" className="w-10 h-10"/>
      </div>

      {/* Botón del formulario Y CREAR API JSON DEL POST - actualizado con colores de pikachu  */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/formulario')}
          className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
        >
          <FileText size={18} />
          Optimizacion del Pokemon
        </button>


        <button
    onClick={() => navigate('/posts')}
    className="flex items-center gap-2 bg-pika-dark text-pika-yellow font-semibold px-6 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
  >
    <FileText size={18} />
    Ver Posts
  </button>
      </div>

      {/* Search - Colores actualizadas del pikachu*/}
<form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-2 mb-8">
  {/* Botón volver al inicio */}
  <button
    type="button"
    onClick={() => navigate('/')}
    className="flex items-center gap-2 bg-pika-brown text-white px-4 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
  >
    <ArrowLeft size={18} />
    Inicio
  </button>
   {/* Buscador */}
  <input
    {...register('search')}
    type="text"
    placeholder="Buscar pokémon..."
    className="border-2 border-pika-yellow rounded-xl px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
  />
  <button
    type="submit"
    className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-4 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
  >
    <Search size={18} />
    Buscar
  </button>
  {search && (
    <button
      type="button"
      onClick={onClear}
      className="flex items-center gap-2 bg-pika-dark text-white px-4 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
    >
      <X size={18} />
      Limpiar
    </button>
  )}
</form>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {renderCards()}
      </div>

      {/* Paginación - actualizado con colores de pikachu  */}
      {/* Uso del chevron para la paginacion */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        <span className="text-pika-dark font-bold">Página {page + 1}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

// las opciones de boton y limpiar de la pagina y el grid
function PokemonDetailCard({ name }) {
  const { data, isLoading } = usePokemonDetail(name)

  if (isLoading) return <PokemonSkeleton />

  if (!data) return null

  return (
    <PokemonCard
      id={data.id}
      name={data.name}
      image={data.sprites.other['official-artwork'].front_default}
      types={data.types.map((t) => t.type.name)}
    />
  )
}
// Componente auxiliar para cargar el detalle de cada pokemon de la lista
// cuando ya el api recibe la informacion muestra el card brindadno la data de la variable
export default HomePage