export const addTrip = async () => {
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;
  
    // تحقق من أن الحقول ليست فارغة
    if (!destination || !departureDate) {
      window.alert("يرجى إدخال جميع البيانات");
      return;
    }
  
    // محاكاة اتصال بـ API للحصول على الإحداثيات
    const locationResponse = await fetch(`https://api.geonames.org/search?q=${destination}&maxRows=1&username=yourUsername`);
    const locationData = await locationResponse.json();
  
    if (locationData.geonames && locationData.geonames.length > 0) {
      const { lat, lon } = locationData.geonames[0];
  
      // محاكاة اتصال بـ API للحصول على بيانات الطقس
      const weatherResponse = await fetch(`https://api.open-meteo.com/weather?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min`);
      const weatherData = await weatherResponse.json();
  
      // إضافة بطاقة الرحلة إلى الـ DOM
      const tripCard = `
        <div class="trip-card">
          <h3>رحلة إلى: ${destination}</h3>
          <p>تاريخ المغادرة: ${departureDate}</p>
          <p>الطقس المتوقع: ${weatherData.daily.temperature_2m_max[0]}°C (الحد الأقصى)، ${weatherData.daily.temperature_2m_min[0]}°C (الحد الأدنى)</p>
        </div>
      `;
      
      document.getElementById('trips').innerHTML += tripCard;
    } else {
      window.alert("لم يتم العثور على موقع");
    }
  };
  