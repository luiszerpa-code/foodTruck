import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import foodRouter from './routers/food'
import userRouter from './routers/user'
import orderRouter from './routers/order'
//import { dbConnect } from './configs/database.config'; 
import './configs/databaseconfig'

//dbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 3000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
}) 

export default app;