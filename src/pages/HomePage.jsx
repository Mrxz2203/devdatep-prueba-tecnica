import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePokemons, usePokemonDetail } from '../hooks/usePokemons'
import PokemonCard from '../components/PokemonCard'
import PokemonSkeleton from '../components/PokemonSkeleton'

function HomePage() {
  const [search, setSearch] = useState('')
  const { register, handleSubmit } = useForm()

  const { data, isLoading } = usePokemons({ limit: 20 })

  const { data: searchResult, isLoading: isSearching } = usePokemonDetail(search)

  const onSubmit = (values) => {
    setSearch(values.search.toLowerCase().trim())
  }

  const onClear = () => {
    setSearch('')
  }

  const renderCards = () => {
    if (search) {
      if (isSearching) return <PokemonSkeleton />
      if (!searchResult) return <p className="text-gray-500">No se encontró ningún pokémon.</p>
      return (
        <PokemonCard
          key={searchResult.id}
          id={searchResult.id}
          name={searchResult.name}
          image={searchResult.sprites.other['official-artwork'].front_default}
          types={searchResult.types.map((t) => t.type.name)}
        />
      )
    }

    if (isLoading) {
      return Array.from({ length: 20 }).map((_, i) => <PokemonSkeleton key={i} />)
    }

    return data?.results.map((poke, index) => (
      <PokemonDetailCard key={poke.name} name={poke.name} index={index} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">PokéApp 🔴</h1>

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

// Componente auxiliar para cargar el detalle de cada pokemon de la lista
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

export default HomePage