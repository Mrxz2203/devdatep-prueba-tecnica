import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonDetail } from '../hooks/usePokemons'
// importe del lucidereact, arrow para los iconos de paginacion
// ruler para la altura y weight para el tamaño
import { ArrowLeft, Ruler, Weight } from 'lucide-react'
// el useparams lee los parametros de la url del api de los pokemons
// navigate para navegar entre paginas, y detail para la info de los pokemones
import PageLoader from '../../../components/PageLoader'
// importamos el uso de carga de pagina aplicando UI
function PokemonDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = usePokemonDetail(name)
  // el useparams extrañe el nombre del pokemon ingresado y en detail procede a buscarlo del api

 if (isLoading) return <PageLoader message="Cargando pokémon..." />
// agregado en el loading como error el uso de pikachu colores + el nuevo UI de components
  if (isError) return (
    <div className="min-h-screen bg-pika-yellowLight flex items-center justify-center">
      <p className="text-red-500 text-xl font-semibold">Error al cargar el pokémon.</p>
    </div>
  )
  // loading para la busqueda de pokemon
  // error sino encuentra ningun dato o pokemon relacionado

  return (
    <div className="min-h-screen bg-pika-yellowLight px-4 py-8">
      {/* Botón volver - Agregado de colores de Pikachu */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 bg-pika-yellow text-pika-dark font-semibold px-4 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      {/* Tarjeta de detalle - Agregado de colores de Pikachu */}
      <div className="bg-white border-2 border-pika-yellow rounded-2xl shadow-lg max-w-md mx-auto p-8 flex flex-col items-center gap-4">

        {/* Número y nombre - Agregado de colores de Pikachu */}
        <span className="text-pika-brown text-sm font-semibold">#{String(data.id).padStart(3, '0')}</span>
        <h1 className="text-3xl font-bold text-pika-dark capitalize">{data.name}</h1>

        {/* Imagen - Agregado de colores de Pikachu */}
        <img
          src={data.sprites.other['official-artwork'].front_default}
          alt={data.name}
          className="w-48 h-48 object-contain"
        />

        {/* Tipos - Agregado de colores de Pikachu */}
        <div className="flex gap-2">
          {data.types.map((t) => (
            <span key={t.type.name} className="bg-pika-yellow text-pika-dark text-sm font-semibold px-4 py-1 rounded-full capitalize">
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Info básica - Agregado de colores de Pikachu */}
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <div className="bg-pika-yellowLight border border-pika-yellow rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-pika-brown text-sm mb-1">
              <Ruler size={14} />
              <p>Altura</p>
            </div>
            <p className="text-pika-dark font-bold text-lg">{data.height / 10} m</p>
          </div>
          <div className="bg-pika-yellowLight border border-pika-yellow rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-pika-brown text-sm mb-1">
              <Weight size={14} />
              <p>Peso</p>
            </div>
            <p className="text-pika-dark font-bold text-lg">{data.weight / 10} kg</p>
          </div>
        </div>

        {/* Stats - Agregado de colores de Pikachu */}
        <div className="w-full mt-2">
          <h2 className="text-pika-dark font-bold text-lg mb-3">Estadísticas</h2>
          {data.stats.map((s) => (
            <div key={s.stat.name} className="mb-2">
              <div className="flex justify-between text-sm text-pika-brown capitalize mb-1">
                <span>{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
              <div className="w-full bg-pika-yellowLight rounded-full h-2">
                <div
                  className="bg-pika-yellow h-2 rounded-full"
                  style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Habilidades - Agregado de colores de Pikachu */}
        <div className="w-full mt-2">
          <h2 className="text-pika-dark font-bold text-lg mb-3">Habilidades</h2>
          <div className="flex gap-2 flex-wrap">
            {data.abilities.map((a) => (
              <span key={a.ability.name} className="bg-pika-yellowLight border border-pika-yellow text-pika-dark text-sm px-3 py-1 rounded-full capitalize">
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
// Primero creamos la opcion del boton volver, y agregamos la opcion tarjeta al presionar el personaje
// Los listados son el numero y nombre, imagen, tipos, info basica, los stats y las habilidades
export default PokemonDetailPage