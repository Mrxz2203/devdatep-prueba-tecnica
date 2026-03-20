import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// importamos la funcionalidad del usestate, navigate para la navegacion de paginas, y el form para el formulario de hook de los pokemones
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostById, useUpdatePost, useDeletePost } from '../hooks/usePosts'
// importamos el uzo de zod y las funcionalides del nuevo api de post
import { postSchema } from '../schemas/postSchema'
import { ArrowLeft, Pencil, Trash2, Save, X } from 'lucide-react'
// importamos el uso del zod y sus validaciones como el uso de la libreria react

function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
// pedido del id del pokemon, navegacion y la ediacion del post
  const { data: post, isLoading, isError } = usePostById(id)
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
  const { mutate: deletePost } = useDeletePost()
// carga de lid, subir y eliminar el post
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema),
    values: {
      titulo: post?.title ?? '',
      contenido: post?.body ?? '',
      usuario: post?.userId ?? 1,
    }
  })
// registro de los datos ocn los campos contenido, titulo y usuario
  const onSubmit = (values) => {
    updatePost({
      id,
      data: {
        title: values.titulo,
        body: values.contenido,
        userId: values.usuario,
      }
    }, {
      onSuccess: () => setIsEditing(false)
    })
  }

  const onDelete = () => {
    deletePost(id, {
      onSuccess: () => navigate('/posts')
    })
  }
// funcionalid de subir el post con eliminar el post
  if (isLoading) return (
    <div className="min-h-screen bg-pika-yellowLight flex items-center justify-center">
      <p className="text-pika-brown text-xl font-semibold">Cargando...</p>
    </div>
  )

  if (isError) return (
    <div className="min-h-screen bg-pika-yellowLight flex items-center justify-center">
      <p className="text-red-500 text-xl font-semibold">Error al cargar el post.</p>
    </div>
  )
// el uso de cargar y error dependiendo de la validacio n yrestircion de la funcionalidad aplicada del post
  return (
    <div className="min-h-screen bg-pika-yellowLight px-4 py-8">

      {/* Botón volver - volver a la pagina */}
      <button
        onClick={() => navigate('/posts')}
        className="flex items-center gap-2 mb-6 bg-pika-yellow text-pika-dark font-semibold px-4 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="bg-white border-2 border-pika-yellow rounded-2xl shadow-lg max-w-2xl mx-auto p-8 flex flex-col gap-6">

        {/* Número del post por cada id */}
        <span className="text-pika-brown text-sm font-semibold">#{post.id}</span>

        {isEditing ? (
          // Modo edición del post con los campos, titulo contenido usuario aplicando el tamaño en sus secciones
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-pika-dark text-sm font-semibold">Título</label>
              <input
                {...register('titulo')}
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
            </div>
            <div>
              <label className="text-pika-dark text-sm font-semibold">Contenido</label>
              <textarea
                {...register('contenido')}
                rows={4}
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark resize-none bg-white"
              />
              {errors.contenido && <p className="text-red-500 text-xs mt-1">{errors.contenido.message}</p>}
            </div>
            <div>
              <label className="text-pika-dark text-sm font-semibold">Usuario (1-10)</label>
              <input
                {...register('usuario')}
                type="number"
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md disabled:opacity-50"
              >
                <Save size={18} />
                {isUpdating ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-pika-dark text-white font-semibold px-6 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
              >
                <X size={18} />
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          // Modo vista - de la edicion y eliminacion con sus respecivos botones
          <>
            <h1 className="text-2xl font-bold text-pika-dark capitalize">{post.title}</h1>
            <p className="text-pika-brown leading-relaxed">{post.body}</p>
            <p className="text-pika-brown text-sm">Usuario: <span className="font-bold text-pika-dark">{post.userId}</span></p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
              >
                <Pencil size={18} />
                Editar
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 bg-red-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-red-600 transition-colors shadow-md"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostDetailPage