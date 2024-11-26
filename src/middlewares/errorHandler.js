export function handleGlobalError(pageHandler) { // Взимаме функцията
    return async function(...params) { //втъщаме нова функция която ще изпълни старата
        try {
            pageHandler(...params);
        } catch (err) {
            alert(err.message);
        }
    };
}