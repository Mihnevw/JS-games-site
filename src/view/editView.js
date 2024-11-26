import { html } from "../../node_modules/lit-html/lit-html.js";
import * as gamesServices from '../services/gamesServices.js';
import { createSubmitHandler } from "../services/util.js";

const editTemplate = (game, onSubmit) => html`
<section id="edit-page" class="auth">
        <form @submit=${onSubmit} id="edit">
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value=${game.title}>

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value=${game.category}>

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                <input class="btn submit" type="submit" value="Edit Game">

            </div>
        </form>
    </section>
`;

export async function editView(ctx) {
    const gameId = ctx.params.id; //Много прилича на детайлите 
    const game = await gamesServices.getById(gameId) // втората стъпка много прилича на създаването

    ctx.render(editTemplate(game, createSubmitHandler(ctx, onSubmit)))
};

async function onSubmit(ctx, data, event) {
    const gameId = ctx.params.id; //Много прилича на детайлите 

    if (Object.values(data).some(f => f == '')) { // (Object.values-Ще ни върне стойностите на data-та и ако има една стойност която е празен стринг върни true
        return alert('All fields are required') // Ако сме оставили празно поле ще видим тоя надпис ако не ще видим clg
    }
    
    await gamesServices.update(gameId, {
            title: data.title,
            category: data.category,
            maxLevel: data.maxLevel,
            imageUrl: data.imageUrl,
            summary: data.summary
        } 
    )
    event.target.reset()
    ctx.page.redirect('/details/' + gameId)
};