import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PokemonList from '../components/home/PokemonList';
import { useDebounce } from '../hooks/useDebounce';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const pokemons = trpc.useQuery(['pokemon.get-all', { offset: limit * (page - 1), limit: limit, query: String(useDebounce(query ?? '', 500)) }]);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);

    setQuery(e.target.value);
  };

  const onChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);

    setLimit(Number(e.target.value));
  };

  return (
    <>
      <input type="text" value={query} onChange={onChangeQuery} />
      <input type="number" value={limit} name="limit" onChange={onChangeLimit} />
      <div>
        <PokemonList isLoading={pokemons.isLoading} pokemons={pokemons.data?.pokemons ?? []} />
      </div>
      <div>
        {pokemons.data && (
          <>
            <div>
              {pokemons.data.offset >= pokemons.data.limit && <button onClick={() => setPage(page - 1)}>Previous</button>}
              {Array.from({ length: Math.ceil(pokemons.data.total / pokemons.data.limit) }, (_, i) => i + 1).map((v, i) => (
                <button className="px-2" onClick={() => setPage(v)} key={v}>
                  {v}
                </button>
              ))}
              {pokemons.data.total > pokemons.data.offset + pokemons.data.limit && <button onClick={() => setPage(page + 1)}>Next</button>}
            </div>
            <div>{pokemons.data.total} pokemons found</div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
