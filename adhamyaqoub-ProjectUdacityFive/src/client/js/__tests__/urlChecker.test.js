import { checkUrl } from '../urlChecker';

describe('URL Validation', () => {
    test('should return true for a valid URL', () => {
        expect(checkUrl('https://www.google.com')).toBe(true);
    });

    test('should return false for an invalid URL', () => {
        expect(checkUrl('invalid-url')).toBe(false);
    });
});
