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
    res.status(400).json({
      errors: [
        {
          message: 'Email Already Exist',
          key: 'email',
        },
      ],
    });
    return;
  }
  // eslint-disable-next-line operator-linebreak
  const sql =
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
  const argArr = [name, email, password, roleId];
  const [usersArr, err] = await dbQueryWithData(sql, argArr);
  if (err || emailCountError) {
    res.status(500).json('Server Error');
    return;
  }
  if (usersArr.affectedRows !== 1) {
    res.status(500).json('IDK hacking problems Error');
  }
  // ieskau userId ir userRole kad nusiusti JWT su informacija
  const sqlFind = `
    SELECT users.*, users_roles.name AS user_role 
    FROM users 
    JOIN users_roles ON users_roles.id = users.role_id
    WHERE email = ? LIMIT 1
  `;
  const [userArr, getError] = await dbQueryWithData(sqlFind, [email]);
  if (getError) {
    res.status(500).json('Server Error');
    return;
  }
  const userRole = userArr[0].user_role;
  const userId = userArr[0].id;
  // sukuriu tokena
  const accessToken = createAccessToken(userId, email, userRole);
  // siunciu tokena
  res.status(200).json({ accessToken: accessToken });
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
  const sql = `
    SELECT users.*, users_roles.name AS user_role 
    FROM users 
    JOIN users_roles ON users_roles.id = users.role_id
    WHERE email = ? LIMIT 1
  `;
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
  const userRole = userArr[0].user_role;
  // sukuriu tokena
  const accessToken = createAccessToken(userArr[0].id, email, userRole);
  // siunciu tokena
  res.status(200).json({ accessToken: accessToken });
});

// validuoti tokena ar sutampa is localStorage jei taip grazinu true
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
    const userId = data.user_id;
    const userRole = data.user_role;
    res
      .status(200)
      .json({ user_id: userId, user_role: userRole, status: 'true' });
  });
});

module.exports = authRoute;
