document.getElementById('submit-btn').addEventListener('click', () => {
  event.preventDefault();
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const unixDate = Math.round(new Date(date).getTime() / 1000)

  // checking the provided date within a week or not. if not it takes as a future. 
  const today = Math.round(new Date().getTime() / 1000);
  const daysAhead = Math.round(((unixDate - today) / 86400));
  const isFuture = daysAhead > 7;
  if (location && date) {
    const data = {
      location: location,
      date: unixDate,
      isFuture: isFuture,
      daysAhead: daysAhead
    };

    getForecast(data).then(async (res) => {
      try {
        const result = await res.json();
        if (result) {
          document.getElementById('trip-to').innerHTML = location;
          document.getElementById('trip-on').innerHTML = date;
          document.getElementById('day-info').innerHTML = `${daysAhead} ${daysAhead >= 1 ? 'days away!' : 'days behind!'}`;
          document.getElementById('weather').innerHTML = result.summary;
          document.getElementById('weather').innerHTML = result.summary || 'not provided';
          document.getElementById('high').innerHTML = result.tempHigh || '-';
          document.getElementById('low').innerHTML = result.tempLow || '-';
        }
      } catch (error) {
        alert('error occoured! try again.');
      }
    });
  } else {
    alert('please enter valid details!')
  }


});

const getForecast = async (data) => {
  return await fetch(`http://localhost:8081/getForecast`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}