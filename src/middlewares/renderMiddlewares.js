import { render, html } from '../../node_modules/lit-html/lit-html.js';


const navigationTemplate = (user) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
        <a href="/catalog">All games</a>
        <a href="/search">Search</a>
        ${user 
        ? html`
        <div id="user">
            <a href="/create">Create Game</a>
            <a href="/my-games">My games</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
        }
    </nav>
`;

const header = document.querySelector('.my-header');
const root = document.getElementById('main-content');

function ctxRender(templateResult) {
    render(templateResult, root)
};

export function addRender(ctx, next) {
    render(navigationTemplate(ctx.user), header)
    ctx.render = ctxRender
    next();
};