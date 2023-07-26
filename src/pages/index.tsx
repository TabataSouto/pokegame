import styles from "@/styles/Home.module.css";

import Head from "next/head";
import Image from "next/image";

import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";

import { setPlayer } from "../helpers/storage";


export default function Home() {
  const [state, setState] = useState("");
  const id = v4();

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    setPlayer("user", {
      id,
      name: state,
    });
  };

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.title}>Quem é esse</h1>
        <Image
          src="/images/logo.svg"
          width="500"
          height="200"
          alt="logo"
          className={styles.logo}
        />
      </div>
      <div>
        <form onSubmit={handleClick} className={styles.form}>
          <input
            type="text"
            name="player"
            placeholder="Digite seu nome ou apelido"
            onChange={handleChange}
          />
          <button type="submit" disabled={state.length > 3 ? false : true}>
            Começar
          </button>
        </form>
      </div>
    </section>
  );
}
