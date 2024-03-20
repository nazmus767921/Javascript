const searchInput = document.getElementById("search-input");
const pokemonImage = document.getElementById("pokemon-image");
const searchButton = document.getElementById("search-button");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const API_URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const getPokemonData = async (pokemon) => {
  let pokemonData;

  try {
    const res = await fetch(`${API_URL}/${pokemon}`);
    pokemonData = await res.json();
    return pokemonData;
  } catch (err) {
    console.log(err.message);
    return (pokemonData = []);
  }
};

function checkIfNumberOrString(value) {
  if (isNaN(value)) {
    return "string";
  } else {
    return "number";
  }
}

searchButton.onclick = async () => {
  let inputValue = searchInput.value;

  // If no value is provided
  if (!inputValue) {
    alert("Please enter a Pokemon name!");
    return;
  }
  // Process the input based on input type
  if (checkIfNumberOrString(inputValue) !== "number") {
    inputValue = inputValue?.trim().toLowerCase();
  } else {
    inputValue = Number(inputValue);
  }

  const data = await getPokemonData(inputValue);

  if (data.length === 0) {
    return alert("Pokémon not found");
  }

  // Clear types element before displaying new types
  types.innerHTML = "";

  data.types?.forEach((typelist) => {
    types.innerHTML += `<span style="display: inline; padding-inline: 5px">${typelist.type.name?.toUpperCase()}</span>`;
  });

  pokemonInfo.style.display = "flex";
  pokemonImage.innerHTML = `<img id="sprite" src="${data?.sprites?.front_default}" alt="" />`;
  pokemonName.textContent = `${data.name.toUpperCase()}`;
  pokemonId.textContent = `${data.id}`;
  weight.textContent = data.weight;
  height.textContent = data.height;
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
};
