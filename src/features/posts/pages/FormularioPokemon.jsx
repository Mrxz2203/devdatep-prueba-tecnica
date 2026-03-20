// zod ayuda a validar las reglas del schema automatica
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from "../schemas/postSchema"
import { useState } from 'react'
// importe de las herramientas de la libreria lucide react
import { ArrowLeft, Send, RefreshCw, FileText, User, AlignLeft } from 'lucide-react'
// importamos el uso del zod
// zod es la libreria de validacion
// zpdresolver funciona como lo que conecta zod con los hooks
function FormularioPokemon() {
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)
  const [respuesta, setRespuesta] = useState(null)
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(postSchema)
})
// aqui es la logica del formulario dependiendo del estado si ha sido completado o vacio, con los campos 
// declarados enviado si ya fue enviado formulario, respuesta ya completado
// zodResolver funciona como la conexion del schema de zod con los hooks

  const onSubmit = async (values) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: values.titulo,
        body: values.contenido,
        userId: values.usuario,
      }),
      headers: { 'Content-type': 'application/json' }
    })
    const data = await res.json()
    setRespuesta(data)
    setEnviado(true)
  }
// el post es la publicacion donde estamos inicializando al formulario
// los campos de este post son el titulo, el contexto y tamaño, como el id del pokemon
// JSON.stringify() convierte los valores de js a JSON
// se guarda la respuesta despues de lo esperado y es enviado

  return (
    <div className="min-h-screen bg-pika-yellowLight px-4 py-8">
      {/* Botón volver - Agregado de colores Pikachu*/}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 bg-pika-yellow text-pika-dark font-semibold px-4 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="bg-white border-2 border-pika-yellow rounded-2xl shadow-lg max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold text-pika-dark mb-6 text-center flex items-center justify-center gap-2">
          <FileText size={24} />
          Recomendacion
        </h1>

        {enviado ? (
          <div className="text-center">
            <p className="text-green-500 font-bold text-lg mb-4">¡Post creado exitosamente! ✅</p>
            <div className="bg-pika-yellowLight border border-pika-yellow rounded-xl p-4 text-left">
              <p className="text-pika-brown text-sm">ID: <span className="text-pika-dark font-bold">{respuesta.id}</span></p>
              <p className="text-pika-brown text-sm">Título: <span className="text-pika-dark font-bold">{respuesta.title}</span></p>
              <p className="text-pika-brown text-sm">Contenido: <span className="text-pika-dark font-bold">{respuesta.body}</span></p>
              <p className="text-pika-brown text-sm">Usuario: <span className="text-pika-dark font-bold">{respuesta.userId}</span></p>
            </div>
            <button
              onClick={() => { setEnviado(false); setRespuesta(null) }}
              className="flex items-center gap-2 mx-auto mt-4 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
            >
              <RefreshCw size={18} />
              Crear otro post
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Título - Agregado de colores Pikachu */}
            <div>
              <label className="text-pika-dark text-sm font-semibold flex items-center gap-1">
                <FileText size={14} />
                Título
              </label>
              <input
                {...register('titulo')}
                type="text"
                placeholder="Escribe el título..."
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
            </div>

            {/* Contenido - Agregado de colores Pikachu*/}
            <div>
              <label className="text-pika-dark text-sm font-semibold flex items-center gap-1">
                <AlignLeft size={14} />
                Contenido
              </label>
              <textarea
                {...register('contenido')}
                placeholder="Escribe el contenido..."
                rows={4}
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark resize-none bg-white"
              />
              {errors.contenido && <p className="text-red-500 text-xs mt-1">{errors.contenido.message}</p>}
            </div>

            {/* Usuario - Agregado de colores Pikachu*/}
            <div>
              <label className="text-pika-dark text-sm font-semibold flex items-center gap-1">
                <User size={14} />
                Usuario (1-10)
              </label>
              <input
                {...register('usuario')}
                type="number"
                placeholder="Número de usuario..."
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
            >
              <Send size={18} />
              Enviar Post
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
// se selecciona los campos que posee el formulario, una vez llenado aparece la opcion de crear post
// se establece el mensaje de enviado exitosamente cuando se hizo el envio del post
// Los campos son el titulo, contenido y el id del usuario
export default FormularioPokemon