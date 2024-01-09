const mysql = require('mysql2/promise');
const dbConfig = require('./config');
const jwt = require('jsonwebtoken');

async function dbQueryWithData(sql, argArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(sql, argArr);
    return [rows, null];
  } catch (err) {
    return [null, err];
  } finally {
    if (conn) conn.end();
  }
}

function getValidationErrors(err) {
  return err.details.map((obj) => ({
    message: obj.message,
    key: obj.context.key,
  }));
}

function createAccessToken(userId, email, userRole) {
  const accessToken = jwt.sign(
    { user_id: userId, user_role: userRole, email },
    process.env.AUTH_TOKEN_SECRET
  );
  return accessToken;
}

module.exports = {
  dbQueryWithData,
  getValidationErrors,
  createAccessToken,
};
