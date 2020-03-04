document.getElementById('submit-btn').addEventListener('click', () => {
  event.preventDefault();
  console.log(document.getElementById('date').value )
  const data = { location: document.getElementById('location').value };
  getForecast(data).then(async (res) => {
    try {
      const result = await res.json();
      if (result) {
        alert(result.msg);
      }
    } catch (error) {
      alert('error occoured! try again.');
    }
  });
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