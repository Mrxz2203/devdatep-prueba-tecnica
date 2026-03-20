// hacemos uso del querycliente para leer datos, mutation para modificar datos, querycliente para cache de reactquery
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../services/postsService'
// importamos el postservice de las funciones que realiza el service
import toast from 'react-hot-toast'
// importamos la libreria toast para su uso
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
// Se hace uso del toast para el sucess y error
export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('¡Post creado exitosamente!')
    },
    onError: ()=>{
    toast.error('Error al crear el post')
    }
  })
}
{/* La subida de lpost y el uso de toast en las notificaciones*/}
// PUT - editar un post
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('¡Post actualizado exitosamente!')    
    },
    onError: () =>{
      toast.error('Error al actualizar el post')
    }
  })
}
{/* La eliminacion del post + el uso de toast */}
// DELETE - eliminar un post
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
toast.successtoast.error('Error al actualizar el post')
    },
    onError: () => {
       toast.error('Error al eliminar el post')
    }
  })
}