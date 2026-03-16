import { useQuery } from '@tanstack/react-query'
import { getPokemonDetail, getPokemons } from '../services/pokemonService'

export const usePokemons = ({ limit = 20, offset = 0 } = {}) => {
  return useQuery({
    queryKey: ['pokemons', limit, offset],
    queryFn: () => getPokemons({ limit, offset }),
  })
}

export const usePokemonDetail = (nameOrId) => {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => getPokemonDetail(nameOrId),
    enabled: !!nameOrId,
  })
}