var path = require('path');
const express = require('express');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(express.static('dist'));

app.use(cors());

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
})

app.get('/getForcast', function (req, res) {
  res.send(mockAPIResponse);
})
