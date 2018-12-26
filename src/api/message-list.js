import 'whatwg-fetch';
const API_URL = 'https://message-list.appspot.com';

/**
 * Fetch a (nearly) endless stream of messages.
 *
 * @param {Number} limit - Limit of messages to be fetched (max 100)
 * @param {String} pageToken - To get the next page token (null by default)
 * @returns {Object} list of fetched messages
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

    return transformMessageList(await response.json());
};

const transformMessageList = response => {
    const { messages, pageToken, count } = response;

    const transformedMessages = messages.reduce((acc, message) => {
        acc.push({
            author: { name: message.author.name, photoUrl: `${API_URL}${message.author.photoUrl}` },
            content: message.content,
            id: '$' + message.id,
            updated: new Date(message.updated)
        });

        return acc;
    }, []);

    return { count, pageToken, messages: transformedMessages };
};

export { getMessages };
