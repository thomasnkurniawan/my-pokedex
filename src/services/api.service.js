import axios from 'axios'
import axiosInstance from '@/plugins/axios'

export const fetchPokemonData = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`pokemon/?page=${page}`)
    const pokemons = response.data.results

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const speciesResponse = await axios.get(pokemon.url)
        const speciesData = speciesResponse.data

        const abilities = speciesData.abilities.map((ability) => ({
          name: ability.ability.name,
          slot: ability.slot
        }))

        const types = speciesData.types.map((type) => type.type.name)

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesData.id}.png`

        return {
          id: speciesData.id,
          name: pokemon.name,
          abilities,
          types,
          imageUrl
        }
      })
    )

    return pokemonDetails
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
    return []
  }
}

export const fetchPokemonTypesData = async () => {
  try {
    const response = await axiosInstance.get('/type')
    if (response.status === 200) {
      const types = response.data.results.map((type) => type.name)
      return types
    } else {
      console.log('Error fetching data')
      return []
    }
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const fetchPokemonbyTypesData = async (typeName, page) => {
  try {
    const offset = (page - 1) * 20

    const response = await axiosInstance.get(`/type/${typeName}?offset=${offset}&limit=20`)
    if (response.status === 200) {
      const pokemonList = response.data.pokemon.map((pokemon) => ({ ...pokemon.pokemon }))
      console.debug(pokemonList)

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const speciesResponse = await axios.get(pokemon.url)
          const speciesData = speciesResponse.data

          const abilities = speciesData.abilities.map((ability) => ({
            name: ability.ability.name,
            slot: ability.slot
          }))

          const types = speciesData.types.map((type) => type.type.name)

          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesData.id}.png`

          return {
            id: speciesData.id,
            name: pokemon.name,
            abilities,
            types,
            imageUrl
          }
        })
      )

      return pokemonDetails
    } else {
      console.log('Error fetching data')
      return []
    }
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const getPokemonById = async (id) => {
  const url = 'https://beta.pokeapi.co/graphql/v1beta'

  const query = `
      query {
        pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
          name
          id
          height
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
              pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: 9}}) {
                effect
              }
            }
          }
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
              pokemon_v2_generation {
                name
              }
            }
          }
          pokemon_v2_pokemonspecy {
            pokemon_v2_pokemoncolor {
              name
            }
            pokemon_v2_pokemonhabitat {
              name
            }
          }
        }
      }
  
    `

  const requestBody = {
    query: query
  }

  try {
    const response = await axios.post(url, requestBody)
    if (response.status === 200) {
      const pokemonDetails = response.data.data.pokemon_v2_pokemon
      const mappedPokemonData = pokemonDetails.map((item) => {
        const {
          name,
          id,
          height,
          pokemon_v2_pokemonabilities,
          pokemon_v2_pokemontypes,
          pokemon_v2_pokemonspecy: { pokemon_v2_pokemoncolor, pokemon_v2_pokemonhabitat }
        } = item

        const abilities = pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => {
          const { name, pokemon_v2_abilityeffecttexts } = pokemon_v2_ability

          return {
            name,
            description: pokemon_v2_abilityeffecttexts[0]
          }
        })

        const pokemonTypes = pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => {
          const { name, pokemon_v2_generation } = pokemon_v2_type

          return {
            name,
            generationName: pokemon_v2_generation.name
          }
        })

        const species = {
          color: pokemon_v2_pokemoncolor.name,
          habitat: pokemon_v2_pokemonhabitat.name
        }

        return {
          name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id,
          height,
          abilities,
          pokemonTypes,
          species
        }
      })
      return mappedPokemonData
    } else {
      console.log('Error fetching data')
      return []
    }
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
