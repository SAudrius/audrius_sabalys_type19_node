const express = require('express');

const authRoute = express.Router();

authRoute.get('/', (req, res) => {
  console.log('hi');
  res.json('test');
});

module.exports = authRoute;
