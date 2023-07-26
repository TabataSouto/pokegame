export const requestAll = async () => {
  const maxPokemons = 500;
  const api = "https://pokeapi.co/api/v2/pokemon";
  const response = await fetch(`${api}/?limit=${maxPokemons}`);
  return await response.json();
};

export const randomPokemon = (results) => {
  // results é um array de objetos;
  const newList = [];

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * results.length - 1);
    const { url, name } = results[index];
    const id = url.substring(34, url.length - 1);

    newList.push({
      /* somado o id do pokemon com a posição porque pode acontecer
      cair o mesmo pokemon mais de uma vez*/
      id: +id + i,
      name,
      url: `https://veekun.com/dex/media/pokemon/dream-world/${id}.svg`,
    });
  }

  return newList;
};

const randomName = (arr) => {
  // const shuffleNumber = 0.3;
  return arr.sort(() => Math.random() - 0.5);
};

export const createAlternatives = (arr, index) => {
  // pega o nome do pokemon que está para adivinhar
  const rightAnswer = arr[index].name;

  /* remove o polemon correto para que o nome não 
  se repita nas alternativas geradas*/
  const removeCorrectAnswer = arr
    .filter((d) => d.name !== rightAnswer)
    .map((n) => n.name);

  
  // embaralha os nomes
  const shufleOne = randomName([...removeCorrectAnswer,]);
  
  // cria uma array com o nome original e 3 outros embaralhados
  const alternatives = [rightAnswer, ...shufleOne.slice(1, 4)];

  // embaralha os 4 nomes de pokemons criados no array acima
  return randomName(alternatives);
};