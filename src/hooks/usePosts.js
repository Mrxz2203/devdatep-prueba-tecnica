// hacemos uso del querycliente para leer datos, mutation para modificar datos, querycliente para cache de reactquery
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../services/postsService'
// importamos el postservice de las funciones que realiza el service
// GET - listar todos los posts
{/* Traemos toda la informacion de los posts y lo garudamos en en keyposts*/}
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}
{/* Obtenemos un post por id, se ejecuta cuando inicialias el post y se obtiene lo buscado*/}
// GET - obtener un post por id
export const usePostById = (id) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })
}
{/* Creamos el post, mutation para la modifiacion de los campos, mutate es la funcion aplicada, onsucess es todo valido*/}
// POST - crear un post
export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
{/* La subida de lpost */}
// PUT - editar un post
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
{/* La eliminacion del post */}
// DELETE - eliminar un post
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}