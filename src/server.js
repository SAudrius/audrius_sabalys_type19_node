require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/v1/authRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// middleware
app.use(cors());

// routes
app.use('/v1/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
