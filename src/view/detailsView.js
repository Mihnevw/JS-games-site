import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gamesServices from '../services/gamesServices.js';
import { commentFormView } from "./commentForm.js";
import { commentsView } from "./comments.js";

const detailsTemplate = (game, commentsSection, commentFormSection, onDelete, onLike, onDislike) => html`
<section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <span class="levels">likes: ${game.likes}</span>
                ${game.canLike
                ? html`
                <div class="buttons">
                    <a @click=${onLike} href="javascript:void(0)" class="button">Like</a>
                </div>`
                : nothing
    }

                ${game.canDislike
                ? html`
                <div class="buttons">
                    <a @click=${onDislike} href="javascript:void(0)" class="button">Dislike</a>
                </div>`
                : nothing
    }
            
                <p class="type"><a href="/my-games/${game._ownerId}">Game by this user</a></p>
                <p class="type">${game.category}</p>
            </div>

            <p class="text">${game.summary}</p>

            ${commentsSection}

            ${game.isOwner
            ? html` 
            <div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>`
            : nothing
    }
            ${commentFormSection}
</section> 
`;

export async function detailsView(ctx) {
    const gameId = ctx.params.id; // Вземаме си id-то от ctx.params.id
    const [game, commentsSection] = await Promise.all([
        gamesServices.getById(gameId),
        commentsView(gameId)
    ]);

    const [likes, hasLiked] = await Promise.all([
        gamesServices.getLikes(gameId),
        gamesServices.hasLiked(gameId, ctx.user)
    ]);
    game.likes = likes;

    //Това за сега става излишно
    //const game = await gamesServices.getById(gameId); //Правим си game който await-ваме и gamesServices подаваме нашата функция и вътре в нея подаваме gameId

    if (ctx.user) { //Ако има user 
        game.hasUser = true;
        game.isOwner = ctx.user._id == game._ownerId; //Проверяваме дали е owner на дадената игра
        game.canLike = !game.isOwner && !hasLiked;
        game.canDislike = !game.isOwner && hasLiked;
    }
    const commentFormSection = commentFormView(ctx, game.isOwner);

    ctx.render(detailsTemplate(game, commentsSection, commentFormSection, onDelete, onLike, onDislike))

    async function onDelete(game) {
        const choice = confirm(`Are you sure you want to delete ${game.title}?`);
        if (choice) {
            await gamesServices.deleteById(gameId)
            ctx.page.redirect('/')
        }
    }

    async function onLike() {
        await gamesServices.likeGame(gameId)
        ctx.page.redirect('/details/' + gameId)
    }

    async function onDislike() {
        await gamesServices.dislikeGame(hasLiked._id)
        ctx.page.redirect('/details/' + gameId)
    }
};
