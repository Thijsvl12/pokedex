import { writeFileSync } from 'fs';
import { PokemonClient } from 'pokenode-ts';

const doBackfill = async () => {
  const pokeApi = new PokemonClient();

  const pokemons = await pokeApi.listPokemons(0, 905);

  const formattedPokemons = pokemons.results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
  }));

  writeFileSync('data/pokemon.json', JSON.stringify(formattedPokemons, null, 2));
};

doBackfill();
