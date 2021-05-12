const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'content')));
app.listen(process.env.PORT || 3080);

app.use(express.static('dist'))
console.log('Online on port ' + process.env.PORT);
