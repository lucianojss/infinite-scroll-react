import 'whatwg-fetch';
const API_URL = 'https://message-list.appspot.com';

/**
 * Fetch a (nearly) endless stream of messages.
 *
 * @param {Number} limit
 * @param {String} pageToken
 */
const getMessages = async (limit, pageToken = null) => {
    const url = new URL(`${API_URL}/messages`);

    const params = { limit, pageToken };

    for (let key in params) {
        if (params[key]) url.searchParams.append(key, params[key]);
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw response;
    }

    return jsonToMessage(await response.json());
};

function jsonToMessage(response) {
    const { messages, pageToken, count } = response;
    const messagesUpdated = messages.reduce((acc, message) => {
        acc.push({
            author: { name: message.author.name, photoUrl: `${API_URL}${message.author.photoUrl}` },
            content: message.content,
            id: message.id,
            updated: new Date(message.updated)
        });

        return acc;
    }, []);
    return { count, pageToken, messages: messagesUpdated };
}

export { getMessages };
