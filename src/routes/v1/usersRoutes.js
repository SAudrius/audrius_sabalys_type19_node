const express = require('express');
const { dbQueryWithData } = require('../../helper');

const usersRoute = express.Router();

usersRoute.get('/', async (req, res) => {
  const sql = 'SELECT * FROM users';
  const [usersArr, err] = await dbQueryWithData(sql);
  if (err) {
    res.status(500).json('Server error');
  }
  res.json(usersArr);
});

module.exports = usersRoute;
