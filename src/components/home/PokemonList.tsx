import { Pokemon } from 'pokenode-ts';
import type { FC } from 'react';
import PokemonListItem from './PokemonListItem';

interface PokemonListProps {
  isLoading: boolean;
  pokemons: Pokemon[];
}

const PokemonList: FC<PokemonListProps> = ({ isLoading, pokemons }) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
export default PokemonList;
