import messageList from './messageList';
import { MESSAGE_LIST_ACTIONS } from '../actions/actions';
describe('#messageList', () => {
    test('should return the initial state', () => {
        expect(messageList(undefined, {})).toEqual({
            messages: [],
            pageToken: null,
            limit: 25,
            loading: false,
            error: null,
            hasMore: true
        });
    });

    test('should return GET_MESSAGES_LOADING state', () => {
        expect(
            messageList(undefined, {
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING
            })
        ).toEqual({
            messages: [],
            pageToken: null,
            limit: 25,
            loading: true,
            error: null,
            hasMore: true
        });
    });

    test('should return GET_MESSAGES_SUCCESS state', () => {
        expect(
            messageList(undefined, {
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_SUCCESS,
                payload: {
                    pageToken: 'dummyToken',
                    messages: [1, 2]
                }
            })
        ).toEqual({
            messages: [1, 2],
            pageToken: 'dummyToken',
            limit: 25,
            loading: false,
            error: null,
            hasMore: true
        });
    });

    test('should return GET_MESSAGES_ERROR state', () => {
        expect(
            messageList(undefined, {
                type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_ERROR,
                payload: 'error'
            })
        ).toEqual({
            messages: [],
            pageToken: null,
            limit: 25,
            loading: false,
            error: 'error',
            hasMore: true
        });
    });

    test('should return DELETE_MESSAGE state', () => {
        expect(
            messageList(
                {
                    messages: [{ id: 1 }, { id: 2 }, { id: 3 }],
                    pageToken: null,
                    limit: 25,
                    loading: false,
                    error: null,
                    hasMore: true
                },
                {
                    type: MESSAGE_LIST_ACTIONS.DELETE_MESSAGE,
                    payload: 2
                }
            )
        ).toEqual({
            messages: [{ id: 1 }, { id: 3 }],
            pageToken: null,
            limit: 25,
            loading: false,
            error: null,
            hasMore: true
        });
    });
});
