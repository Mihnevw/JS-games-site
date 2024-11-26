import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as commentServices from '../services/commentServices.js';
import { createSubmitHandler } from "../services/util.js";

const formTemplate = (onSubmit) => html`
    <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onSubmit} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
    </article>
`;

export function commentFormView(ctx, isOwner) {
    if (ctx.user && !isOwner) {
        return formTemplate(createSubmitHandler(ctx, onSubmit));
    } else {
        return nothing;
    }
};

async function onSubmit(ctx, data, event) {
    const gameId = ctx.params.id; // Вземаме си id-то от ctx.params.id

    if (data.comment == '') {
        return alert('All fields are required');
    }

    await commentServices.postComment({
        gameId,
        comment: data.comment
    });

    event.target.reset();
    ctx.page.redirect(`/details/${gameId}`); //Така караме да се редиректне към същата страница за да се рефрешне сама 
};