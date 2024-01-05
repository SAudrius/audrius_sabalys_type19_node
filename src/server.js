require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/v1/authRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

// middleware

// routes
app.use("/v1/api", authRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
