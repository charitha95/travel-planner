var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

const apiList = {
  geonames : {
    baseUrl:'http://api.geonames.org/',
    api: process.env.GEONAMES_API_KEY
  },
  darksky : {
    baseUrl:'https://api.darksky.net/forecast/',
    api: process.env.DARKSKY_API_KEY
  },
  pixabay : {
    baseUrl:'https://pixabay.com/api/',
    api: process.env.PIXABAY_API_KEY
  }
}

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
})

app.post('/getForecast', function (req, res) {
  const data = { ...req.body };
  fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => (
      console.log(json)
    ));
  res.send({msg: 'from api utto'});
})
