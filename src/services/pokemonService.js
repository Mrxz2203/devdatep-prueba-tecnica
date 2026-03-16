const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemons = async ({ limit = 20, offset = 0 }) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Error al obtener pokémons')
  return res.json()
}

export const getPokemonDetail = async (nameOrId) => {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
  if (!res.ok) throw new Error('Pokémon no encontrado')
  return res.json()
}