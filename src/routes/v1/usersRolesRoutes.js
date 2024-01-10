const express = require('express');
const { dbQueryWithData } = require('../../helper');

const usersRolesRouter = express.Router();

usersRolesRouter.get('/', async (req, res) => {
  const sql = 'SELECT * FROM users_roles';
  const [rolesArr, err] = await dbQueryWithData(sql);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  res.json(rolesArr);
});

module.exports = usersRolesRouter;
