import { clearUserData, getAccessToken } from '../services/util.js';

const host = 'http://localhost:3030';

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    };

    const token = getAccessToken();
    if (token) { //Ако има tokne ми го дай
        options.headers['X-Authorization'] = token;

    };
    if (data) {
        options.headers['Content-Type'] = 'application/json',
            options.body = JSON.stringify(data);
    };

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        if (response.status == 204) {
            return response
        } else {
            return response.json();
        }
    } catch (err) {
        //alert(err.message)
        throw err;
    }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');