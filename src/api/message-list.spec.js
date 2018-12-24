import { getMessages } from './message-list';

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    });
};

const responseSampleMock =
    '{"count": 1,"pageToken": "dummyToken","messages": [{"content":"dummyContent","updated": "2015-02-01T07:46:23Z","id": 1,"author": {"name": "William Shakespeare","photoUrl": "/photos/william-shakespeare.jpg"}}]}';

describe('#getMessages', () => {
    test('fetch should be called with correct arguments', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, responseSampleMock)));

        await getMessages(25, 'dummyToken');

        const url = new URL(`https://message-list.appspot.com/messages`);
        const params = { limit: 25, pageToken: 'dummyToken' };

        for (let key in params) {
            if (params[key]) url.searchParams.append(key, params[key]);
        }

        expect(window.fetch).toBeCalledWith(url);
    });

    test('should return correct data', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, responseSampleMock)));

        const response = await getMessages(25, 'dummyToken');

        expect(response).toEqual({
            count: 1,
            pageToken: 'dummyToken',
            messages: [
                {
                    author: {
                        name: 'William Shakespeare',
                        photoUrl: 'https://message-list.appspot.com/photos/william-shakespeare.jpg'
                    },
                    content: 'dummyContent',
                    id: 1,
                    updated: new Date('2015-02-01T07:46:23Z')
                }
            ]
        });
    });

    describe('when server does not respond', () => {
        test('should throw an error', async () => {
            window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(400, 'Test Error!')));
            try {
                await getMessages(25, 'dummyToken');
            } catch (error) {
                expect(error.statusText).toEqual('Test Error!');
            }
        });
    });
});
