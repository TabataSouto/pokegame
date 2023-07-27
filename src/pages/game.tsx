import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";

import { createAlternatives, randomPokemon, requestAll } from "../helpers/api";

import styles from "@/styles/Home.module.css";
import { getSorage, setStorage } from "@/helpers/storage";
import { useRouter } from "next/router";

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
  const [isDisabled, setIsDisabled] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [pointing, setPointing] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setAlternatives(createAlternatives(pokemons, index));
  }, [index, pokemons]);

  const handleAnswer = ({ target }: any) => {
    setIsDisabled(true);
    setNextButton(false);

    const show = document.querySelector<HTMLElement>(
      ".pokemon_image"
    ) as HTMLElement;
    show.style.filter = "none";

    const correct = document.querySelector(".correct") as HTMLElement;
    const pokemon = pokemons[index].name;

    if (pokemon === target.name) {
      setPointing(pointing + 10);
      target.style.color = "blue";
    }
    if (pokemon !== target.name) {
      target.style.color = "red";
      correct.style.color = "blue";
    }
  };

  const handleNext = () => {
    setIsDisabled(false);

    if (index < 9) {
      const elements = document.querySelectorAll<HTMLElement>(
        ".correct, .incorrect"
      );
      elements.forEach((element) => {
        element.style.color = "black";
      });

      setIndex(index + 1);
      setAlternatives(createAlternatives(pokemons, index + 1));
      const image = document.querySelector(".pokemon_image") as HTMLElement;
      image.style.filter = "invert(50%) brightness(0%)";
    } else {
      const player = getSorage("user");
      const rank = getSorage("rank") || [];
      rank.push({
        ...player,
        pointing,
      });
      setStorage("rank", rank);
      router.push("/rank");
    }
  };

  return (
    <main>
      <div className="container">
        <Image
          src={pokemons[index].url}
          width={200}
          height={250}
          alt={pokemons[index].name}
          className="pokemon_image"
          style={{ filter: "invert(50%) brightness(0%)" }}
        />
      </div>
      <div className={styles.alternatives}>
        {alternatives.map((alt) => (
          <button
            key={alt}
            type="button"
            name={alt}
            disabled={isDisabled}
            onClick={handleAnswer}
            className={alt === pokemons[index].name ? "correct" : "incorrect"}
          >
            {alt}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={nextButton}
        className={styles.buttonNext}
      >
        Próximo Pokémon
      </button>
    </main>
  );
};

export default Game;
