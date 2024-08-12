const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const foodRouter = require('./routers/foodrouter.js');
const userRouter = require('./routers/userrouter.js');
const orderRouter = require('./routers/orderrouter.js');
// const { dbConnect } = require('./configs/database.config'); 
require('./configs/databaseconfig.js');

// Initialize your app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Use routers
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
