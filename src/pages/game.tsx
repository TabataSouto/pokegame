import { GetStaticProps } from "next";

import { createAlternatives, randomPokemon, requestAll } from "../helpers/api";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Pokemons {
  name: string;
  url: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await requestAll();

  const random = randomPokemon(data.results);

  return {
    props: {
      pokemons: random,
    },
  };
};

export interface PokemonAPI {
  name: string;
  url: string;
}

interface GameProps {
  pokemons: PokemonAPI[];
}

const Game = ({ pokemons }: GameProps) => {
  const [index, setIndex] = useState(0);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    setAlternatives(createAlternatives(pokemons, index));
  }, []);

  return (
    <main>
      <h1>{pokemons[index].name}</h1>
      <Image src={pokemons[index].url} width={200} height={250} alt="" />
      {alternatives.map((alt) => (
        <button key={alt} type="button">{alt}</button>
      ))}
    </main>
  );
};

export default Game;
