import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../services/util.js";
import * as gamesServices from '../services/gamesServices.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="auth">
        <form @submit=${onSubmit}id="create">
            <div class="container">

                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
</section>
`;

export async function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
};

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(f => f == '')) { // (Object.values-Ще ни върне стойностите на data-та и ако има една стойност която е празен стринг върни true
        return alert('All fields are required') // Ако сме оставили празно поле ще видим тоя надпис ако не ще видим clg
    }
    
    await gamesServices.create(
        {
            title: data.title,
            category: data.category,
            maxLevel: data.maxLevel,
            imageUrl: data.imageUrl,
            summary: data.summary
        } 
    )
    event.target.reset()
    ctx.page.redirect('/')
};