const recoverPokemon = async() => {
    const pokemonList = [];
    for( let index = 1; index <= 150; index++){
        const pokemon = await fetch( 'https://pokeapi.co/api/v2/pokemon/' + index);
        const data = await pokemon.json();
        pokemonList.push( data );
    }
    return mapCharacters(pokemonList);
}
const mapCharacters = ( list ) => {
    list.map( element => {
        console.log( element )
        return generateHTML({
            one: element.abilities.map( values => {
                return values.ability.name
            }),
            two: element.name,
            three: element.id,
            four: element.sprites.back_default,
            five: element.moves.map( value => {
                return value.move.name
            }),
            six: element.base_experience,
            seven: element.weight,
        })
    });
}
const generateHTML = ( keys ) => {
    const div = document.querySelector('#pokemons');
    const createFigure = `
    <div class="cards_list">
        <p><img src="${keys.four}"></p>
        <p class="info"><strong>ID:</strong> ${keys.three} <strong>NAME:</strong> ${(keys.two).toUpperCase()}</p>
        <p><strong>Experiencia</strong> ${keys.six}</p>
        <p><strong>Tamaño</strong> ${keys.seven}</p>
        <label><strong><u>Habilidades</u></strong></label>
        <p>${keys.one}</p>
    </div>
    `;
    printHmtl( createFigure, div );
}
const printHmtl = (html, container) => {
    container.innerHTML += html;
}
recoverPokemon();