import { MESSAGE_LIST_ACTIONS } from './actions';
import { getMessages } from '../api/message-list';

/**
 * Fetches messages from API
 *
 * @param {Number} limit - Limit of messages to be fetched (max 100)
 * @param {String} token - To get the next page token (null by default)
 */
export const getMessagesList = (limit, token = null) => async dispatch => {
    dispatch({
        type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING
    });

    try {
        const result = await getMessages(limit, token);

        if (result.messages && result.pageToken) {
            return dispatch({
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS,
                payload: {
                    messages: result.messages,
                    pageToken: result.pageToken
                }
            });
        } else {
            return dispatch({
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS,
                payload: {
                    messages: [],
                    pageToken: null
                }
            });
        }
    } catch (error) {
        return dispatch({
            type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_ERROR,
            payload: error
        });
    }
};

/**
 * Removes message from list at a given index
 *
 * @param {Number} indexToRemove
 */
export const deleteMessage = indexToRemove => dispatch => {
    return dispatch({
        type: MESSAGE_LIST_ACTIONS.DELETE_MESSAGE,
        payload: indexToRemove
    });
};
