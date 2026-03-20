// agregamos la pagina de carga usando el icono de pokebola para mas dinamissmo en el ui y ux del usuario
function PageLoader({ message = 'Cargando...' }) {
  return (
    <div className="min-h-screen bg-pika-yellowLight flex flex-col items-center justify-center gap-4">
      <img
        src="/pokebola.png"
        alt="cargando"
        className="w-16 h-16 object-contain animate-spin"
        style={{ animationDuration: '1.5s' }}
      />
      <p className="text-pika-brown font-semibold text-xl">{message}</p>
    </div>
  )
}

export default PageLoader