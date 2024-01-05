const express = require('express');

const authRoute = express.Router();

authRoute.get('/', (req, res) => {
  res.json('auth route');
});

module.exports = authRoute;
