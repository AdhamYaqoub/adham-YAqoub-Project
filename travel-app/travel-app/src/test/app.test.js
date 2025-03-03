import { addTrip } from '../client/js/app'; 
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks(); // Enable mock fetch

describe('UI Function Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="destination" value="">
      <input id="departure-date" value="">
      <div id="trips"></div>
    `;
    window.alert = jest.fn(); // Mock alert function
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  test('addTrip should alert if fields are empty', () => {
    addTrip();
    expect(window.alert).toHaveBeenCalledWith("يرجى إدخال جميع البيانات");
  });

  test('addTrip should add a trip card when valid data is entered', async () => {
    document.getElementById('destination').value = 'Paris';
    document.getElementById('departure-date').value = '2025-06-15';

    // Mock fetch response for geonames and weather data
    fetchMock.mockResponseOnce(JSON.stringify({
      geonames: [{ lat: 48.8566, lon: 2.3522 }]
    })) // Mock for location search
    .mockResponseOnce(JSON.stringify({
      daily: { temperature_2m_max: [25], temperature_2m_min: [15] }
    })); // Mock for weather data

    await addTrip();

    expect(document.getElementById('trips').innerHTML).toContain('رحلة إلى: Paris');
    expect(document.getElementById('trips').innerHTML).toContain('الطقس المتوقع: 25°C (الحد الأقصى)، 15°C (الحد الأدنى)');
  });
});
