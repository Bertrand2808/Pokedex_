const pokedex = document.getElementById('pokedex');

const pokeCache = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemons = data.results.map((result, index) => ({
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`
  }));
  displayPokemon(pokemons);
};

const displayPokemon = (pokemons) => {
    const pokemonHTMLString = pokemons
    .map(
      (pokemon) =>
        `
      <li class="card" onclick="selectPokemon(${pokemon.id})">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
      </li>
      `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokeCache[id] = pokemon;
    displayPopup(pokemon);
  }else {
    displayPopup(pokeCache[id]);
  };
};
const displayPopup = (pokemon) => {
  const type = pokemon.types.map((type) => type.type.name).join(', ');
  const image = pokemon.sprites['front_default'];
  const htmlString = `
    <div class="popup">
      <button class="button_close" id="closeBtn" onclick="closePopup()">Close</button>
      <div class="card">
          <img class="card-image" src="${image}"/>
          <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
          <p><small>Height: </small>${pokemon.height} | <small>Weight: </small>${pokemon.weight} | <small>Type: </small>${type}
      </div>
    </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};

const searchPokemons = (search) => {
  return pokemons.filter(pokemon => {
    const regex = new RegExp(search, 'gi');
    return pokemon.name.match(regex);
  });
};

const displaySearch = () => {
  const tabresult = searchPokemons(this.value, pokemons);
  console.log(tabresult);
};

const inputSearch = document.querySelector('input');
const resultat = document.querySelector('ul');
inputSearch.addEventListener('change', displaySearch);
inputSearch.addEventListener('keyup', displaySearch);

fetchPokemon();
