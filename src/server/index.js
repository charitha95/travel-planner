var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const apiList = getApiMeta()

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
})

app.post('/getForecast', function (req, res) {
  const { date, location, isFuture } = req.body;
  // geonames api call
  const geonamesReq = `${apiList.geonames.baseUrl}/searchJSON?q=${location}&maxRows=10&username=${apiList.geonames.api}`;
  fetch(geonamesReq)
    .then(res => res.json())
    .then(json => {
      // getting latitude and longitude
      const lat = json.geonames[0].lat;
      const lng = json.geonames[0].lng;

      // darksky api call
      const darkskyReq = `${apiList.darksky.baseUrl}/forecast/${apiList.darksky.api}/${lat},${lng},${date}${isFuture ? '?exclude=currently,flags' : ''}`;
      fetch(darkskyReq)
        .then(res => res.json())
        .then(json => {
          const summary = json.daily.data[0].summary;
          const tempHigh = json.daily.data[0].temperatureHigh;
          const tempLow = json.daily.data[0].temperatureLow;

          // pixabay api call
          const pixabayReq = `${apiList.pixabay.baseUrl}//?key=${apiList.pixabay.api}&category=place&q=${location}&image_type=photo}`;
          fetch(pixabayReq)
            .then(res => res.json())
            .then(json => {
              const img = json.hits[0].webformatURL;
              const sumObj = { summary: summary, tempHigh: tempHigh, tempLow: tempLow, img: img };
              res.send(sumObj);
            });
        });
    });

});

function getApiMeta() {
  return {
    geonames: {
      baseUrl: 'http://api.geonames.org',
      api: process.env.GEONAMES_API_KEY
    },
    darksky: {
      baseUrl: 'https://api.darksky.net',
      api: process.env.DARKSKY_API_KEY
    },
    pixabay: {
      baseUrl: 'https://pixabay.com/api',
      api: process.env.PIXABAY_API_KEY
    }
  }
}
module.exports = { getApiMeta };