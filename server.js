const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'content')));

const listenPort = process.env.PORT || 3080
app.listen(listenPort);

app.use(express.static('dist'))
console.log('Online on port ' + listenPort);
