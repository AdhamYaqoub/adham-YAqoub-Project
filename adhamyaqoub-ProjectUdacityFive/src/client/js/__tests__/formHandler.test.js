import { handleSubmit } from '../formHandler';
import { checkUrl } from '../urlChecker';

jest.mock('../urlChecker.js');

describe('Form Handler', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="form">
                <input id="name" value="https://www.valid-url.com" />
                <div id="results"></div>
            </form>`;
    });

    test('should call checkUrl and display alert for invalid URL', () => {
        checkUrl.mockReturnValue(false);
        window.alert = jest.fn();

        handleSubmit({ preventDefault: jest.fn() });

        expect(checkUrl).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('The URL provided is invalid. Please enter a valid URL.');
    });

    test('should make API call for valid URL', async () => {
        checkUrl.mockReturnValue(true);
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Test response' }),
            })
        );

        await handleSubmit({ preventDefault: jest.fn() });

        expect(checkUrl).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalled();
        expect(document.getElementById('results').innerHTML).toBe('Test response');
    });
});
