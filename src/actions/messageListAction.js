import { MESSAGE_LIST_ACTIONS } from './actions';
import { getMessages } from '../api/message-list';

export const getMessagesList = (limit, token) => async dispatch => {
    dispatch({
        type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING
    });

    try {
        const result = await getMessages(limit, token);

        if (result.messages && result.pageToken) {
            return dispatch({
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS,
                messages: result.messages,
                pageToken: result.pageToken
            });
        } else {
            return dispatch({
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS,
                messages: [],
                pageToken: null
            });
        }
    } catch (error) {
        return dispatch({
            type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_ERROR,
            payload: error
        });
    }
};
