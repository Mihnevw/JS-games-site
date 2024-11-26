import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/sessionMiddlewear.js';
import { addRender } from './middlewares/renderMiddlewares.js';

import { logout } from './services/userServices.js';

import { catalogView } from './view/catalogView.js';
import { createView } from './view/createView.js';
import { detailsView } from './view/detailsView.js';
import { editView } from './view/editView.js';
import { homeView } from './view/homeView.js';
import { loginView } from './view/loginView.js';
import { registerView } from './view/registerView.js';
import { searchView } from './view/searchView.js';
import { handleGlobalError } from './middlewares/errorHandler.js';

import * as requester from './services/gamesServices.js'
import { profileView } from './view/profile.js';
window.api = requester

page(addSession)
page(addRender);

page('/', handleGlobalError(homeView));
page('/catalog', handleGlobalError(catalogView));
page('/my-games', handleGlobalError(profileView));
page('/my-games/:userId', handleGlobalError(profileView));
page('/search', handleGlobalError(searchView));
page('/login', handleGlobalError(loginView));
page('/register', handleGlobalError(registerView));
page('/create', handleGlobalError(createView));
page('/details/:id', handleGlobalError(detailsView));
page('/edit/:id', handleGlobalError(editView));
page('/logout', handleGlobalError(onLogout));

page.start();

function onLogout(ctx) {
    logout()
    ctx.page.redirect('/');
}