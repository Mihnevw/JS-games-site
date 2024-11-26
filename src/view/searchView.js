import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import * as gamesServices from '../services/gamesServices.js';
import { createSubmitHandler } from "../services/util.js";

// На 13-ред трябва да се редактира да се махне ${}
const searchTemplate = (games, param, onSubmit) => html`
<section id="catalog-page" @scroll=${(event) => console.log(event)}>
        <h1>Search</h1>
        <form @submit=${onSubmit}>
            <input type="text" name="search" .value=${param}>
            <input type="submit" name="Search">
        </form>

       ${gamesList(games)}

</section>
`;

const gamesList = (games) => {
    if (games.length == 0) {
        return html`<h3 class="no-articles">No articles yet</h3>`
    } else {
        return games.map(cardTemplate);
    }
}

const cardTemplate = (game) => html`
<div class="allGames">
            <div class="allGames-info">
                <img src=${game.imageUrl}>
                <h6>${game.category}</h6>
                <h2>${game.title}</h2>
                <a href="/details/${game._id}" class="details-button">Details</a>
            </div>
        </div>
`;

export async function searchView(ctx) {
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()]);
    const param = query.search || ''
    
    const games = await gamesServices.searchGame(param) //Ако нямаме search ще подадем празен стринг 

    ctx.render(searchTemplate(games, param, createSubmitHandler(ctx, onSubmit))) // createSubmitHandler-А приема като първи параметър ctx 

};

function onSubmit(ctx, data, event) {
    ctx.page.redirect('/search?search=' + encodeURIComponent(data.search))
}