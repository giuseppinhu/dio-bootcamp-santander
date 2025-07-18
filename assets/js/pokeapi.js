getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(newPokemonDetails)
}

getDataPokemon = (offset, limit) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
            const promises = data.results.map(getPokemonDetail);
           
            Promise.all(promises).then((pokemons) => {
                pokemons.forEach(renderPokemon);
            });
        })
        .catch((error) => {
            console.error(error)
        }) 
}

