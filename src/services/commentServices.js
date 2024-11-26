import * as requester from '../services/requester.js';

const endpoints = {
    byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    post: '/data/comments',
}

export async function getByGameId(gameId) {
    return requester.get(endpoints.byGameId(gameId));
}

export async function postComment(comment) {
    return requester.post(endpoints.post, comment)
}