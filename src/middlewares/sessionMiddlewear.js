import { getUserData } from "../services/util.js";

export function addSession(ctx, next) {
    ctx.user = getUserData()

    next();
}