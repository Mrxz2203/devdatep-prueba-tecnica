const BASE_URL = 'https://pokeapi.co/api/v2'
// de aqui se extrae la informacion de los pokemones 
// base url funciona como direccion y variable para no repetirse 
export const getPokemons = async ({ limit = 20, offset = 0 }) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Error al obtener pokémon')
  return res.json()
}
// trae y solicita la ifnromacion de los pokemones en un limite de 20 por pagina

export const getPokemonDetail = async (nameOrId) => {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
  if (!res.ok) throw new Error('Pokémon no encontrado')
  return res.json()
}

// pide la informacion de un pokemon buscado, si es que no hay te arroja que no encontro

export const getallPokemonNames = async () => {
 const res = await fetch(`${BASE_URL}/pokemon?limit=1500&offset=0`)
  if (!res.ok) throw new Error ('Error al obtener Pokemons')
    const data = await res.json()
  return data.results // array
}

// async funciona como asincrona que espera al API, si no hay es error, si hay se convierte en data js y nos da la lista de
// de pokemon buscados, includes filtra la coincidencia de busqueda