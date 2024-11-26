import * as requester from './requester.js';
import { clearUserData, setUserData } from '../services/util.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export async function login(email, password) {
    const result = await requester.post(endpoints.login, { email, password })
    setUserData(result);

    return result;
}

export async function register(email, password) {
    const result = await requester.post(endpoints.register, { email, password })
    setUserData(result);

    return result;

}

export async function logout() {
    requester.get(endpoints.logout)
    clearUserData()
}