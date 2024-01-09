const express = require('express');
const { dbQueryWithData } = require('../../helper');

const itemsTypes = express.Router();

itemsTypes.get('/', async (req, res) => {
  const sql = 'SELECT * FROM item_types';
  const [itemTypesArr, err] = await dbQueryWithData(sql);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  res.json(itemTypesArr);
});

module.exports = itemsTypes;
