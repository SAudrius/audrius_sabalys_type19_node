const express = require('express');
const { dbQueryWithData } = require('../../helper');

const shopItemsRouter = express.Router();

shopItemsRouter.get('/', async (req, res) => {
  const sql = 'SELECT * FROM shop_items WHERE is_deleted = 0';
  const [itemsArr, err] = await dbQueryWithData(sql);
  if (err) {
    console.log(err);
    res.status(500).json('Server error');
  }
  res.json(itemsArr);
});

shopItemsRouter.get('/:id', async (req, res) => {
  const itemId = req.params.id;
  const sql = 'SELECT * FROM shop_items WHERE is_deleted = 0 && id = ?';
  const [itemsArr, err] = await dbQueryWithData(sql, [itemId]);
  if (err) {
    console.log(err);
    res.status(500).json('Server error');
  }
  res.json(itemsArr);
});

shopItemsRouter.post('/', async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    item_type_id: itemTypeId,
  } = req.body;
  // eslint-disable-next-line operator-linebreak
  const sql =
    'INSERT INTO shop_items (name, price, description, image, item_type_id) VALUES (?,?,?,?,?)';
  const argsArr = [name, price, description, image, itemTypeId];
  const [result, err] = await dbQueryWithData(sql, argsArr);
  if (err) {
    console.log(err);
    res.status(500).json('Server error');
    return;
  }
  if (result.affectedRows === 1) {
    res.status(200).json('New item added');
  }
});

shopItemsRouter.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  // eslint-disable-next-line operator-linebreak
  const sql =
    'UPDATE shop_items SET is_deleted = 1 WHERE is_deleted = 0 && id = ?  LIMIT 1';
  const [result, err] = await dbQueryWithData(sql, [itemId]);
  if (err) {
    console.log(err);
    res.status(500).json('Server error');
  }
  if (result.affectedRows === 1) {
    res.status(200).json('Item Deleted');
    console.log('result ===', result);
    return;
  }
  res.status(404).json('Item not found');
});

module.exports = shopItemsRouter;
