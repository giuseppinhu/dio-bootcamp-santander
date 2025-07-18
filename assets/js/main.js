let offset = 0;
let limit = 15;

const divPokemons = document.getElementById('pokemons');
const loadMoreBtn = document.getElementById('loadMore');

newPokemonDetails = (pokemonDetail) => {
    const pokemon = new Pokemon;

    pokemon.id = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokemonDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

renderPokemon = (pokemon) => {
    divPokemons.innerHTML += 
        `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src=${pokemon.image}
                        alt="${pokemon.name}">
                </div>
            </li>
        `
}

getDataPokemon(offset, limit)

loadMoreBtn.addEventListener('click', () => {
  offset += limit;
  getDataPokemon(offset, limit);
});