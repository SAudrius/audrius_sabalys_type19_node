require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { dbQueryWithData, createAccessToken } = require('../../helper');
const { validateUsers } = require('../../middleware');

const authRoute = express.Router();

authRoute.post('/register', validateUsers, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, password, role_id: roleId } = req.body;
  // eslint-disable-next-line operator-linebreak
  const checkDuplicateEmailSql =
    'SELECT COUNT(*) as count FROM users WHERE email = ?';
  const [countArr, emailCountError] = await dbQueryWithData(
    checkDuplicateEmailSql,
    // eslint-disable-next-line comma-dangle
    [email]
  );
  if (countArr[0].count > 0) {
    res.status(400).json('Email already exists');
    return;
  }
  // eslint-disable-next-line operator-linebreak
  const sql =
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
  const argArr = [name, email, password, roleId];
  const [usersArr, err] = await dbQueryWithData(sql, argArr);
  if (err || emailCountError) {
    console.log('err ===', err);
    res.status(500).json('Server Error');
    return;
  }
  if (usersArr.affectedRows === 1) {
    res.status(200).json('User created');
  }
});

authRoute.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      errors: [
        {
          message: 'Email field or Password field can not be empty',
          key: 'wrongDiv',
        },
      ],
    });
    return;
  }
  const sql = 'SELECT * from users WHERE email = ? LIMIT 1';
  const [userArr, err] = await dbQueryWithData(sql, [email]);
  if (err) {
    res.status(500).json('Server Error');
    return;
  }
  if (userArr[0]?.password !== password || userArr.length <= 0) {
    res.json({
      errors: [
        {
          message: 'Email or Password is incorrect',
          key: 'wrongDiv',
        },
      ],
    });
    return;
  }
  const accessToken = createAccessToken(userArr[0].id, email);
  res.status(200).json({ accessToken: accessToken });
});
authRoute.post('/token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    res.status(401).json({ msg: 'do not have a token', status: 'false' });
    return;
  }
  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ msg: 'token is not valid', status: 'false' });
      return;
    }
    res.status(200).json({ msg: 'login in', status: 'true' });
  });
});

module.exports = authRoute;
