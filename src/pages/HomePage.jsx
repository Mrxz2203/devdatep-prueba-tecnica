import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePokemons, useAllPokemonNames, usePokemonDetail } from '../hooks/usePokemons'
import PokemonCard from '../components/PokemonCard'
import PokemonSkeleton from '../components/PokemonSkeleton'
// Elegi el Api de pokemon por ser la mas practica 
// Se importa el uso del card y skeleton de pokemon
// search guarda y recibe el dato del pokemon pedido
// el submit maneja el formulario enviado 
function HomePage() {
  const [search, setSearch] = useState('')
  const { register, handleSubmit } = useForm()

  const { data, isLoading } = usePokemons({ limit: 20 })


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
      return <p className="text-gray-500 col-span-full text-center">No se encontró ningún pokémon.</p>
    }
    return filteredNames.map((poke) => (
      <PokemonDetailCard key={poke.name} name={poke.name} />
    ))
  }

  if (isLoading) {
    return Array.from({ length: 20 }).map((_, i) => <PokemonSkeleton key={i} />)
  }

  return data?.results.map((poke) => (
    <PokemonDetailCard key={poke.name} name={poke.name} />
  ))
}
   // si busca el pokemon, estará cargando y mostrara el skeleton
    // sino hay se arrojara que no hay ningun pokemon
    // cuando lo encuentre le retornara los campos de la variable (pokemon) buscado
  // se arroja 20 ids de pokemon cuando entras al homepage 

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Header */}
    <div className="flex items-center justify-center gap-3 mb-8">
      <img src = "/pokebola.png" alt="pokebola" className=" w-10 h-10"/>
<h1 className="text-4xl font-bold text-red-500">Pokeapp</h1>
<img src="/pokebola.png" alt=" pokebola" className=" w-10 h-10"/>
    </div>

      {/* Search */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-2 mb-8">
        <input
          {...register('search')}
          type="text"
          placeholder="Buscar pokémon..."
          className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
        >
          Buscar
        </button>
        {search && (
          <button
            type="button"
            onClick={onClear}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 transition-colors"
          >
            Limpiar
          </button>
        )}
      </form>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {renderCards()}
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