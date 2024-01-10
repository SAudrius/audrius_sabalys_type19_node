const express = require('express');
const { dbQueryWithData } = require('../../helper');

const ordersRoute = express.Router();

ordersRoute.get('/', async (req, res) => {
  const sql = `
    SELECT orders.* , shop_items.name, shop_items.description
    FROM orders
    JOIN shop_items ON shop_items.id = orders.shop_item_id
  `;
  const [ordersArr, err] = await dbQueryWithData(sql);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  res.json(ordersArr);
});

ordersRoute.post('/', async (req, res) => {
  const {
    user_id: userId,
    shop_item_id: shopItemId,
    quantity,
    total_price: totalPrice,
  } = req.body;
  // eslint-disable-next-line operator-linebreak
  const sql =
    'INSERT INTO orders (user_id, shop_item_id, quantity, total_price) VALUES (?, ?, ?, ?)';
  const argsArr = [userId, shopItemId, quantity, totalPrice];
  const [ordersArr, err] = await dbQueryWithData(sql, argsArr);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  if (ordersArr.affectedRows === 1) {
    res.status(200).json('Order Created');
  }
});

ordersRoute.get('/:id', async (req, res) => {
  const orderId = +req.params.id;
  const sql = 'SELECT * FROM orders WHERE id = ? LIMIT 1';
  const [orderArr, err] = await dbQueryWithData(sql, [orderId]);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  res.status(200).json(orderArr[0]);
});

ordersRoute.get('/user/:id', async (req, res) => {
  const userId = +req.params.id;
  const sql = `
  SELECT orders.id, orders.user_id, orders.shop_item_id, orders.quantity, orders.total_price, users.name AS user_name, shop_items.name AS item_name, shop_items.description
  FROM orders
  JOIN users ON orders.user_id = users.id
  JOIN shop_items ON orders.shop_item_id = shop_items.id
  WHERE orders.user_id = ?`;
  const [ordersArr, err] = await dbQueryWithData(sql, [userId]);
  if (err) {
    res.status(500).json('Server error');
    return;
  }
  res.status(200).json(ordersArr);
});

module.exports = ordersRoute;
