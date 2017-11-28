const express = require('express');
const router = express.Router();
const path = require('path');

const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
};


router.get('/', serveIndex);

module.exports = router;
