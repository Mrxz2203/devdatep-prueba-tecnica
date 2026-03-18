// zod ayuda a validar las reglas del schema automatica
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
// importamos el uso del zod
// zod es la libreria de validacion
// zpdresolver funciona como lo que conecta zod con los hooks
const schema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  contenido: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  usuario: z.coerce.number().min(1, 'El usuario debe ser entre 1 y 10').max(10, 'El usuario debe ser entre 1 y 10'),
})
// el z.object define el formulario y el contenido que tendra
// el uso de cada zod se pone como "z.string" "z.number"
// el min es una forma de validar que cumple con 5 caracteres como minimo
// el number convierte el text input a numero para poder ser leido
function FormularioPokemon() {
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)
  const [respuesta, setRespuesta] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
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
//  JSON.stringify() convierte los valores de js a JSON
// se guarda la respuesta despues de lo esperado y es enviado
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Botón volver */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Recomendacion 📝</h1>

        {enviado ? (
          <div className="text-center">
            <p className="text-green-500 font-bold text-lg mb-4">¡Post creado exitosamente! ✅</p>
            <div className="bg-gray-50 rounded-xl p-4 text-left">
              <p className="text-gray-500 text-sm">ID: <span className="text-gray-700 font-bold">{respuesta.id}</span></p>
              <p className="text-gray-500 text-sm">Título: <span className="text-gray-700 font-bold">{respuesta.title}</span></p>
              <p className="text-gray-500 text-sm">Contenido: <span className="text-gray-700 font-bold">{respuesta.body}</span></p>
              <p className="text-gray-500 text-sm">Usuario: <span className="text-gray-700 font-bold">{respuesta.userId}</span></p>
            </div>
            <button
              onClick={() => { setEnviado(false); setRespuesta(null) }}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors"
            >
              Crear otro post
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Título */}
            <div>
              <label className="text-gray-600 text-sm font-semibold">Título</label>
              <input
                {...register('titulo')}
                type="text"
                placeholder="Escribe el título..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
            </div>

            {/* Contenido */}
            <div>
              <label className="text-gray-600 text-sm font-semibold">Contenido</label>
              <textarea
                {...register('contenido')}
                placeholder="Escribe el contenido..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
              {errors.contenido && <p className="text-red-500 text-xs mt-1">{errors.contenido.message}</p>}
            </div>

            {/* Usuario */}
            <div>
              <label className="text-gray-600 text-sm font-semibold">Usuario (1-10)</label>
              <input
                {...register('usuario')}
                type="number"
                placeholder="Número de usuario..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors font-semibold"
            >
              Enviar Post
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
// se selecciona los cmapos que posee el formulario, una ves llenado aparece la opcion de crear post
// se establece el mensaje de enviado exisiotamente cuando se hizo el envio del post
// Los campos son el titulo, contenido y el id del usuario
export default FormularioPokemon