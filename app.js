const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');

const index = require('./routes/index');

const storageDir = path.join(__dirname, 'storage');
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
