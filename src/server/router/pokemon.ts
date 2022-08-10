import { createRouter } from './context';
import { z } from 'zod';

import allPokemons from '../../../data/pokemon.json';
import { PokemonClient } from 'pokenode-ts';

export const pokemonRouter = createRouter().query('get-all', {
  input: z
    .object({
      query: z.string().nullish(),
      offset: z.number().nullish(),
      limit: z.number().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const pokeApi = new PokemonClient();
    let pokemons = allPokemons;

    const query = input?.query ?? '';
    const offset = input?.offset ?? 0;
    const limit = input?.limit ?? pokemons.length - offset;

    if (query) {
      pokemons = pokemons.filter((p) => p.name.indexOf(query) > -1);
    }
    const totalPokemons = pokemons.length;

    pokemons = pokemons.slice(offset, limit + offset);

    return {
      total: totalPokemons,
      offset,
      limit,
      pokemons: await Promise.all(pokemons.map(async (pokemon) => await pokeApi.getPokemonById(pokemon.id))),
    };
  },
});
