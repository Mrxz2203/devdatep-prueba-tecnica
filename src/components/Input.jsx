// creamos la funcion input que reemplaza los input y textarea de los formularios
// los props son label, error, register, rows, placholder 
// para evitar el mismo codigo de los posts y forms
function Input({ label, register, error, type = 'text', placeholder = '', rows }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-pika-dark text-sm font-semibold">{label}</label>
      )}
      {rows ? (
        <textarea
          {...register}
          placeholder={placeholder}
          rows={rows}
          className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark resize-none bg-white"
        />
      ) : (
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
        />
      )}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default Input