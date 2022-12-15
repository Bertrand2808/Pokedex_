const pokedex = document.getElementById('pokedex');
console.log(pokedex);

const fetchPokemons = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        console.log(results);
        displayPokemon(pokemon);
      });
    };

    const displayPokemon = (pokemon) => {
      console.log(pokemon);
      const pokemonHTMLString = pokemon.map ( pokeman =>
        `
      <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type : ${pokeman.type}</p>
      </li>
      `
      ).join('');
      pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemons();
