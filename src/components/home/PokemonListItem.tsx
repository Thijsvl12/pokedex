import Image from 'next/image';
import { Pokemon } from 'pokenode-ts';
import type { FC } from 'react';

interface PokemonListItemProps {
  pokemon: Pokemon;
}

const PokemonListItem: FC<PokemonListItemProps> = ({ pokemon }) => {
  return (
    <>
      {pokemon.id}: {pokemon.name}
      <Image src={pokemon.sprites.other['official-artwork'].front_default ?? 'https://placekitten.com/250/250'} width={250} height={250} alt={pokemon.name} />
    </>
  );
};
export default PokemonListItem;
