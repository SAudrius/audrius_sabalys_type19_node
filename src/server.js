require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require('./routes/v1/authRoutes');
const shopItemsRouter = require('./routes/v1/shopItemsRoutes');
const ordersRoute = require('./routes/v1/ordersRoutes');
const usersRolesRouter = require('./routes/v1/usersRolesRoutes');
const itemsTypes = require('./routes/v1/itemsTypesRoute');
const usersRoute = require('./routes/v1/usersRoutes');
const htmlRouter = require('./routes/v1/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/item_types', itemsTypes);
app.use('/v1/api/shop_items', shopItemsRouter);
app.use('/v1/api/orders', ordersRoute);
app.use('/v1/api/users_roles', usersRolesRouter);
app.use('/v1/api/users', usersRoute);
app.use('/v1/api/html', htmlRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
