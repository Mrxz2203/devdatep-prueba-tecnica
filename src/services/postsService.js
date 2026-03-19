import axios from 'axios'
// Hacemos uso de axios y su instancia para su configuracion

const BASE_URL = 'https://jsonplaceholder.typicode.com'
// hacemos uso de la api de json
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' }
})
// siempre le enviamos archivos json luego de convertirlos del js
// GET - listar todos los posts
export const getPosts = async () => {
  const res = await api.get('/posts')
  return res.data
}

// GET - obtener un post por id
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`)
  return res.data
}

// POST - crear un post
export const createPost = async (data) => {
  const res = await api.post('/posts', data)
  return res.data
}

// PUT - editar un post
export const updatePost = async ({ id, data }) => {
  const res = await api.put(`/posts/${id}`, data)
  return res.data
}

// DELETE - eliminar un post
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`)
  return res.data
}