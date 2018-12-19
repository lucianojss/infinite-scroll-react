import { MESSAGE_LIST_ACTIONS } from '../actions/actions';

const initialState = {
    messages: [],
    pageToken: null,
    limit: 20,
    loading: false,
    error: null,
    hasMore: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING:
            return {
                ...state,
                loading: true
            };
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS:
            const { messages, pageToken } = action.payload;
            return {
                ...state,
                loading: false,
                error: null,
                messages: state.messages.concat(messages),
                pageToken,
                hasMore: pageToken ? true : false
            };
        case MESSAGE_LIST_ACTIONS.GET_MESSAGES_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case MESSAGE_LIST_ACTIONS.DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter((message, index) => index !== action.payload)
            };
        default:
            return state;
    }
};
