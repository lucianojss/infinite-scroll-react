import { MESSAGE_LIST_ACTIONS } from '../actions/actions';

const initialState = {
    messages: [],
    pageToken: null,
    limit: 25,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING:
            return {
                ...state,
                loading: true
            };
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                messages: action.messages,
                pageToken: action.pageToken
            };
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
