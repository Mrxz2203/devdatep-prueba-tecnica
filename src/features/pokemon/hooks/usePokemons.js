// uso de reactquery como puente de informacion del api en useQuery
import { useQuery } from '@tanstack/react-query'
// maneja el cache de los datos 
import { getPokemonDetail, getPokemons, getallPokemonNames } from '../services/pokemonService'

export const usePokemons = ({ limit = 20, offset = 0 } = {}) => {
  return useQuery({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => getPokemons({ limit, offset }),
  })
}
// querykey funciona como peticion unica de cada pokemon 
// queryfn funcion del servicio para traer los datos de cada pedido realizado
export const usePokemonDetail = (nameOrId) => {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => getPokemonDetail(nameOrId),
    enabled: !!nameOrId,
  })
}

// enable nameor id hace la peticion cuando se ha ingresado el nombre o id del pokemon detectando si el pedio fue correcto o no

export const useAllPokemonNames = () => {
  return useQuery ({
    queryKey : ['allPokemonNames'],
queryFn: getallPokemonNames,
staleTime: Infinity,
  })
}
// el hook llama la api para traer los nombres de los pokemones y se guarda en cache