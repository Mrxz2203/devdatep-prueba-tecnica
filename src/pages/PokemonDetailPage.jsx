import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonDetail } from '../hooks/usePokemons'
// el useparams lee los parametros de la url del api de los pokemons
// navigate para navegar entre paginas, y detail para la info de los pokemones
function PokemonDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = usePokemonDetail(name)
// el useparams  extrañe el nombre del pokemon ingresado y en detail procede a buscarlo del api
  if (isLoading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500 text-xl">Cargando...</p>
    </div>
  )

  if (isError) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-red-500 text-xl">Error al cargar el pokémon.</p>
    </div>
  )
  //loading para la busqueda de pokemon
  // error sino encuentra ningun dato o pokemon relacionado

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Botón volver */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
      >
        ← Volver
      </button>

      {/* Tarjeta de detalle */}
      <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto p-8 flex flex-col items-center gap-4">
        
        {/* Número y nombre */}
        <span className="text-gray-400 text-sm">#{String(data.id).padStart(3, '0')}</span>
        <h1 className="text-3xl font-bold text-gray-700 capitalize">{data.name}</h1>

        {/* Imagen */}
        <img
          src={data.sprites.other['official-artwork'].front_default}
          alt={data.name}
          className="w-48 h-48 object-contain"
        />

        {/* Tipos */}
        <div className="flex gap-2">
          {data.types.map((t) => (
            <span key={t.type.name} className="bg-red-400 text-white text-sm font-semibold px-4 py-1 rounded-full capitalize">
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Info básica */}
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Altura</p>
            <p className="text-gray-700 font-bold text-lg">{data.height / 10} m</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Peso</p>
            <p className="text-gray-700 font-bold text-lg">{data.weight / 10} kg</p>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full mt-2">
          <h2 className="text-gray-600 font-bold text-lg mb-3">Estadísticas</h2>
          {data.stats.map((s) => (
            <div key={s.stat.name} className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 capitalize mb-1">
                <span>{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-400 h-2 rounded-full"
                  style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Habilidades */}
        <div className="w-full mt-2">
          <h2 className="text-gray-600 font-bold text-lg mb-3">Habilidades</h2>
          <div className="flex gap-2 flex-wrap">
            {data.abilities.map((a) => (
              <span key={a.ability.name} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full capitalize">
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
// aqui se engloba los detalles que tendra cada pokemon en su respectiva pagina 
//Primero creamos la opcion del boton volver, y agregamos la opcion tarjeta al presionar el personaje
// Los listados son el numero y nombre, imagen, tipos, info basica, los stats y las habilidades
export default PokemonDetailPage