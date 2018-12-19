import * as messageListAction from './messageListAction';
import { MESSAGE_LIST_ACTIONS } from './actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('#messageListAction', () => {
    describe('#deleteMessage', () => {
        test('should dispatch new state', () => {
            const expectedActions = [
                {
                    type: MESSAGE_LIST_ACTIONS.DELETE_MESSAGE,
                    payload: 2
                }
            ];
            const store = mockStore({});
            store.dispatch(messageListAction.deleteMessage(2));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('#getMessagesList', () => {
        test('should dispatch new state', () => {
            const expectedActions = [
                {
                    type: MESSAGE_LIST_ACTIONS.GET_MESSAGES_LOADING
                }
            ];
            const store = mockStore({});
            store.dispatch(messageListAction.getMessagesList(10, 'dummyToken'));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
