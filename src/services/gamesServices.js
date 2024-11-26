import * as requester from '../services/requester.js';

const pageSize = 3;

const endpoints = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    games: (page) => `/data/games?sortBy=_createdOn%20desc&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`,
    count: '/data/games?count',
    create: '/data/games',
    byId: '/data/games/',
    deleteById: '/data/games/',
    update: '/data/games/',
    likes: '/data/likes',
    likesByGameId: '/data/likes?count&distinct=_ownerId&where=',
    ownLike: '/data/likes?where=',
    dislike: '/data/likes/',
    search: '/data/games?where='
}

export async function myGames(userId) {
    return requester.get('/data/games?where=' + encodeURIComponent(`_ownerId="${userId}"`))
}

export async function searchGame(param) {
    return requester.get(endpoints.search + encodeURIComponent(`title LIKE "${param}"`))
}

export async function getRecent() {
    return requester.get(endpoints.recent)
}

export async function getCatalog(page) {
    return requester.get(endpoints.games(page))
}

export async function getCount() {
    const count = await requester.get(endpoints.count)
    return Math.ceil(count / pageSize)
}

export async function getById(id) {
    return requester.get(endpoints.byId + id)
}

export async function create(data) {
    return requester.post(endpoints.create, data)
}

export async function update(id, data) {
    return requester.put(endpoints.update + id, data) // Правим put заяка при редакция
}

export async function deleteById(id) {
    return requester.del(endpoints.deleteById + id)
}

export async function likeGame (gameId) {
    return requester.post(endpoints.likes, {
        gameId
    });
}

export async function getLikes(gameId) {
    return requester.get(endpoints.likesByGameId + encodeURIComponent(`gameId="${gameId}"`))
}

export async function hasLiked(gameId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id
        const likes = await requester.get(endpoints.ownLike + encodeURIComponent(`gameId="${gameId}" AND _ownerId="${userId}"`))
        return likes[0] || false;
    }
}

export async function dislikeGame(likeId) {
   return requester.del(endpoints.dislike + likeId)
}