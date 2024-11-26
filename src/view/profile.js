import { html } from "../../node_modules/lit-html/lit-html.js";

import * as gamesServices from '../services/gamesServices.js';

// На 13-ред трябва да се редактира да се махне ${}
const catalogTemplate = (games) => html`
<section id="catalog-page">
        <h1>All Games</h1>


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

export async function profileView(ctx) {
    const userId = ctx.params.userId || ctx.user._id; // Ако има Id да й на потребителя на който сем дали id ако няма дай на нашия потребител
    const games = await gamesServices.myGames(userId)
    ctx.render(catalogTemplate(games))
};