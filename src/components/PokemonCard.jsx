import { useNavigate }  from "react-router-dom"
// importamos la navegacion entre las cards
const typeColors = {
  fire: 'bg-orange-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-400',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-500',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
  fighting: 'bg-red-600',
  flying: 'bg-sky-300',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-700',
  bug: 'bg-lime-500',
  ghost: 'bg-purple-700',
  steel: 'bg-gray-500',
}
// Se establecen los colores para cada pokemon
// se hace el uso de navigate para cada pokemon
function PokemonCard({ name, image, types, id }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/pokemon/${name}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-4 flex
       flex-col items-center gap-2 cursor-pointer">
      <span className="text-xs text-gray-400 self-end">#{String(id).padStart(3, '0')}</span>
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <h2 className="font-bold text-gray-700 capitalize text-lg">{name}</h2>
      <div className="flex gap-2">
        {types.map((t) => (
          <span
            key={t}
            className={`text-white text-xs font-semibold px-3 py-1 rounded-full capitalize ${typeColors[t] || 'bg-gray-400'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
// con el onclick ahora la tarjeta es clickeable
//typecolor le da cada color al pokemon predterminado.
// { name, image, types, id } → Son las props, de cada elemento
// types.map() , Recorre todos los tipos del pokémon 