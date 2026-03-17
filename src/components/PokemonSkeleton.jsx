function PokemonSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2 animate-pulse">
      <div className="w-12 h-3 bg-gray-200 rounded self-end" />
      <div className="w-24 h-24 bg-gray-200 rounded-full" />
      <div className="w-20 h-4 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="w-14 h-5 bg-gray-200 rounded-full" />
        <div className="w-14 h-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}
// animate pulse es la animacion para el parpadeo gris
// rounded full es la imagen de cada pokemon 
export default PokemonSkeleton