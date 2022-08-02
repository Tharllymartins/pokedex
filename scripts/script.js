const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)

    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + " -";
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
        input.value = '';
    } else {
        pokemonName.innerHTML = "Not found :("
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
})

btnNext.addEventListener('click', () => {
    renderPokemon(`${++searchPokemon}`)
})

btnPrev.addEventListener('click', () => {
    renderPokemon(`${--searchPokemon}`)
})


renderPokemon(`${searchPokemon}`);