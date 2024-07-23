import express from "express";
const app = express(); //app --> object returned by express()

import mongoose from "mongoose";
import dotenv from "dotenv"; //.env is used for secure password and username

import cors from "cors";

// Route definitions
import userUrls from "./routes/user.js";
import cartUrls from "./routes/cart.js";
import notficationUrls from "./routes/notification.js";
import paymentUrls from "./routes/payment.js";
import ordersUrls from "./routes/orders.js";
import storeUrls from "./routes/store.js";
import productsUrls from "./routes/products.js";
import chatUrls from "./routes/chat.js";
import homeUrls from "./routes/home.js";

dotenv.config();

mongoose.connect(
  process.env.Database_Access,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database connected")
);

const port = process.env.PORT || 4000;

//to pass our incoming and outgoing request
app.use(express.json()); //activated body parser
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); //initializing cors

//redirecting server to router.js
app.use("/user", userUrls); //www.mywebite.com/app/signup  (/app --> base path)
app.use("/cart", cartUrls);
app.use("/notification", notficationUrls);
app.use("/payment", paymentUrls);
app.use("/orders", ordersUrls);
app.use("/store", storeUrls);
app.use("/chat", chatUrls);
app.use("/home", homeUrls);
app.use("/products", productsUrls);

app.listen(port, "0.0.0.0", () => console.log("Server is up and running")); // run server on port 4000
