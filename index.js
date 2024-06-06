import express from "express";
const app = express(); //app --> object returned by express()

import mongoose from "mongoose";
import dotenv from "dotenv"; //.env is used for secure password and username

import routeUrls from "./routes/routes.js"; //request-->server.js-->router.js

import cors from "cors";

// Route definitions
import cartUrls from "./routes/cart.js";
import notficationUrls from "./routes/notification.js";
import paymentUrls from "./routes/payment.js";
import ordersUrls from "./routes/orders.js";
import storeUrls from "./routes/store.js";

dotenv.config();

mongoose.connect(
  process.env.Database_Access,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database connected")
);

//to pass our incoming and outgoing request
app.use(express.json()); //activated body parser
app.use(cors()); //initializing cors

//redirecting server to router.js
app.use("/app", routeUrls); //www.mywebite.com/app/signup  (/app --> base path)
app.use("/cart", cartUrls);
app.use("/notification", notficationUrls);
app.use("/payment", paymentUrls);
app.use("/orders", ordersUrls);
app.use("/store", storeUrls);

app.listen(4000, () => console.log("Server is up and running")); // run server on port 4000
