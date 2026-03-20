// creamos la funcion button que dara a opciones dentro de la pagina mas practico, usando colores del pikachu
function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) {
  const variants = {
    primary: 'bg-pika-yellow text-pika-dark hover:bg-pika-yellowDark',
    dark: 'bg-pika-dark text-pika-yellow hover:opacity-80',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-pika-brown text-pika-brown hover:bg-pika-yellow',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 font-semibold px-6 py-2 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button