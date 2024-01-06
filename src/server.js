require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/v1/authRoutes');
const shopItemsRouter = require('./routes/v1/shopItemsRoutes');
const ordersRoute = require('./routes/v1/ordersRoutes');
const usersRolesRouter = require('./routes/v1/usersRolesRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/shop_items', shopItemsRouter);
app.use('/v1/api/orders', ordersRoute);
app.use('/v1/api/users_roles', usersRolesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
