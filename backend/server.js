import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const app = express();

app.use(express.json()); // Allows us to accept json data in the body

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound); // invokes when the route passed isn't an actual one such as -> /astralis
app.use(errorHandler); // automatically invoked when there is a error.

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold
  )
);
