import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePosts, useCreatePost, useDeletePost } from '../hooks/usePosts'
// Importamos el state para la funcionalidad, navigate para la paginacion, el form para el formulario
// Importamos el resolver para el uso del zod dentro del post
// Importamos el contenido de useposts
import { postSchema } from '../schemas/postSchema'
import { Plus, Trash2, Eye, FileText } from 'lucide-react'
// importamos el uso del postschema y el zoo de las 5 funcionalidad
// importamos las herramientas de los 4 que usamos de la libreria react
function PostsPage() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
// hacemos uso de la navegacion de paginas con el formulario antes de su uso
  const { data: posts, isLoading } = usePosts()
  const { mutate: createPost, isPending: isCreating } = useCreatePost()
  const { mutate: deletePost } = useDeletePost()
// hcemos uso de la funcionalidad de lucide react para las creaciones, la carga, modifiacion y la elminacion de post con mutate
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema)
  })

  const onSubmit = (values) => {
    createPost({
      title: values.titulo,
      body: values.contenido,
      userId: values.usuario,
    }, {
      onSuccess: () => {
        reset()
        setShowForm(false)
      }
    })
  }
// Se hace uso de la creacion del apideposts para luego guardarlo respecot al uso de onsucess
  return (
    <div className="min-h-screen bg-pika-yellowLight px-4 py-8">

      {/* Header - Cabecera */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-4 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold text-pika-dark flex items-center gap-2">
          <FileText size={28} />
          Posts - Uso del Api Json 
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pika-dark text-pika-yellow font-semibold px-4 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
        >
          <Plus size={18} />
          Nuevo Post
        </button>
      </div>

      {/* Formulario crear post  DONDE DAMOS LA OPCION DE LOS CAMPOS TITULO CONTENIDO USUARIO*/}
      {showForm && (
        <div className="bg-white border-2 border-pika-yellow rounded-2xl shadow-lg max-w-4xl mx-auto p-6 mb-8">
          <h2 className="text-xl font-bold text-pika-dark mb-4">Crear nuevo post</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-pika-dark text-sm font-semibold">Título</label>
              <input
                {...register('titulo')}
                placeholder="Escribe el título..."
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
            </div>
            <div>
              <label className="text-pika-dark text-sm font-semibold">Contenido</label>
              <textarea
                {...register('contenido')}
                placeholder="Escribe el contenido..."
                rows={3}
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark resize-none bg-white"
              />
              {errors.contenido && <p className="text-red-500 text-xs mt-1">{errors.contenido.message}</p>}
            </div>
            <div>
              <label className="text-pika-dark text-sm font-semibold">Usuario (1-10)</label>
              <input
                {...register('usuario')}
                type="number"
                placeholder="Número de usuario..."
                className="w-full border-2 border-pika-yellow rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pika-yellowDark bg-white"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center gap-2 bg-pika-yellow text-pika-dark font-semibold px-6 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-md disabled:opacity-50"
              >
                <Plus size={18} />
                {isCreating ? 'Creando...' : 'Crear Post'}
              </button>
              <button
                type="button"
                onClick={() => { reset(); setShowForm(false) }}
                className="flex items-center gap-2 bg-pika-dark text-white font-semibold px-6 py-2 rounded-xl hover:opacity-80 transition-colors shadow-md"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de posts */}
<div className="max-w-4xl mx-auto flex flex-col gap-4">
  {isLoading ? (
    // Se muestra 5 esqueletos animados mientras llegan los datos
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    ))
  ) : (
    // Se limita a solo 20 datos extraido de la api json
    posts?.slice(0, 20).map((post) => (
      <div key={post.id} className="bg-white border-2 border-pika-yellow rounded-2xl p-6 flex items-start justify-between gap-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-pika-brown text-xs font-semibold">#{post.id}</span>
          <h2 className="text-pika-dark font-bold text-lg capitalize">{post.title}</h2>
          <p className="text-pika-brown text-sm line-clamp-2">{post.body}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate(`/posts/${post.id}`)}
            className="flex items-center gap-1 bg-pika-yellow text-pika-dark font-semibold px-3 py-2 rounded-xl hover:bg-pika-yellowDark transition-colors shadow-sm"
          >
            <Eye size={16} />
            Ver
          </button>
          <button
            onClick={() => deletePost(post.id)}
            className="flex items-center gap-1 bg-red-500 text-white font-semibold px-3 py-2 rounded-xl hover:bg-red-600 transition-colors shadow-sm"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  )
}

export default PostsPage