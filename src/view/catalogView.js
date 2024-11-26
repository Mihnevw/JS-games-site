import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import * as gamesServices from '../services/gamesServices.js';

// На 13-ред трябва да се редактира да се махне ${}
const catalogTemplate = (games, page, pages, hasUser) => html`
<section id="catalog-page">
        <h1>All Games</h1>

        <div class="levels">
            Page ${page} of ${pages}
            ${page > 1 ? html`<a href="/catalog?page=${page - 1}">&lt; Prev</a>` : nothing}
            ${page < pages ? html`<a href="/catalog?page=${page + 1}">Next &gt;</a>` : nothing}
        </div>

       ${gamesList(games, hasUser)}

</section>
`;

const gamesList = (games, hasUser) => {
    if (games.length == 0) {
        return html`<h3 class="no-articles">No articles yet</h3>`
    } else {
        return games.map(cardTemplate.bind(null, hasUser));
    }
}

const cardTemplate = (hasUser, game) => html`
<div class="allGames">
            <div class="allGames-info">
                <img src=${game.imageUrl}>
                <h6>${game.category}</h6>
                <h2>${game.title}</h2>
                ${hasUser ? html`<a href="/details/${game._id}" class="details-button">Details</a>` : nothing}
            </div>
        </div>
`;

export async function catalogView(ctx) {
    const query = Object.fromEntries([...(new URLSearchParams(ctx.querystring)).entries()]);
    const page = Number(query.page || 1);
    const hasUser = Boolean(ctx.user); // Това показва когато един user е логнат да показва details Бутона а ако не е логнат да не го

    const [games, pages] = await Promise.all([
        gamesServices.getCatalog(page),
        gamesServices.getCount()
    ])
    ctx.render(catalogTemplate(games, page, pages, hasUser))
};