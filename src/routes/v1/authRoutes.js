const express = require('express');
const { dbQueryWithData } = require('../../helper');

const authRoute = express.Router();

authRoute.post('/register', async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, password, role_id: roleId } = req.body;
  // eslint-disable-next-line operator-linebreak
  const sql =
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
  const argArr = [name, email, password, roleId];
  const [usersArr, err] = await dbQueryWithData(sql, argArr);
  if (err) {
    res.status(500).json('Server Error');
    return;
  }
  if (usersArr.affectedRows === 1) {
    res.status(200).json('User created');
  }
});

authRoute.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * from users WHERE email = ? LIMIT 1';
  const [userArr, err] = await dbQueryWithData(sql, [email]);
  if (err) {
    res.status(500).json('Server Error');
    return;
  }
  if (userArr[0].password !== password) {
    res.json('password incorrect');
    return;
  }
  res.status(200).json('access given');
});

module.exports = authRoute;
