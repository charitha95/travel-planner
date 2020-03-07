
const subBtn = document.getElementById('submit-btn');
if (subBtn) {
  document.getElementById('submit-btn').addEventListener('click', () => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const unixDate = getDates(new Date(date).getTime(), 1000)

    // checking the provided date within a week or not. if not it takes as a future. 
    const today = getDates(new Date().getTime(), 1000);
    const daysAhead = getDates((unixDate - today), 86400);
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
            document.getElementById('weather').innerHTML = result.summary || 'not provided';
            document.getElementById('high').innerHTML = result.tempHigh || '-';
            document.getElementById('low').innerHTML = result.tempLow || '-';
            document.getElementById('trip-img').src = result.img || '-';

          }
        } catch (error) {
          alert('error occoured! try again.');
        }
      });
    } else {
      alert('please enter valid details!')
    }
  });
}

const savBtn = document.getElementById('save-btn');
if (savBtn) {
  document.getElementById('save-btn').addEventListener('click', () => {
    if (document.getElementById('trip-to').innerHTML !== '--') {
      let existingTrips = JSON.parse(localStorage.getItem('tripArr')) || [];
      existingTrips.push({
        location: document.getElementById('trip-to').innerHTML,
        date: document.getElementById('trip-on').innerHTML,
        daysAhead: document.getElementById('day-info').innerHTML,
        summary: document.getElementById('weather').innerHTML,
        tempHigh: document.getElementById('high').innerHTML,
        tempLow: document.getElementById('low').innerHTML,
        img: document.getElementById('trip-img').src,
      })
      localStorage.setItem('tripArr', JSON.stringify(existingTrips));
      setSavedList();
    } else {
      alert('Please search for a location first!')
    }

  });
}

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

const getDates = (date, divider) => {
  return Math.round(date / divider);
}

const setSavedList = () => {
  const fragment = document.createDocumentFragment();
  const container = document.getElementById('recently-added');
  let existingTrips = JSON.parse(localStorage.getItem('tripArr')) || [];
  const el = document.getElementById('result-wrapper');
  if (el) {
    el.remove();
    if (existingTrips.length) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', 'result-wrapper');
      existingTrips.forEach((trip, index) => {
        const result = document.createElement('div');
        result.classList.add('result');
        const count = document.createElement('p');
        count.innerHTML = index + 1;
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = trip.img;
        result.appendChild(count);
        figure.appendChild(img);
        result.appendChild(figure);
        const details = document.createElement('div');
        details.classList.add('details');
        const label1 = document.createElement('label');
        label1.innerHTML = `Location: ${trip.location}`;
        const label2 = document.createElement('label');
        label2.innerHTML = `Date: ${trip.date}`;
        const label3 = document.createElement('label');
        label3.innerHTML = `Days from today: ${trip.daysAhead}`;
        const label4 = document.createElement('label');
        label4.innerHTML = `Summary: ${trip.summary}`;
        const label5 = document.createElement('label');
        label5.innerHTML = `High-Low: ${trip.tempHigh} - ${trip.tempLow}`;
        details.appendChild(label1);
        details.appendChild(label2);
        details.appendChild(label3);
        details.appendChild(label4);
        details.appendChild(label5);
        result.appendChild(details);
        wrapper.appendChild(result);
        fragment.appendChild(wrapper);
      });

    } else {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', 'result-wrapper');
      const count = document.createElement('p');
      count.innerHTML = 'You have not saved anything! :)';
      wrapper.appendChild(count);
      fragment.appendChild(wrapper);
    }
  }
  if (container)
    container.appendChild(fragment);
}

(() => {
  setSavedList();
})();

module.exports = { getDates };