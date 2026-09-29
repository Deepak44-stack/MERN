import express from "express";
import productRouter from "./routes/productroute.js";
import mongoose from "mongoose";
import userRouter from "./routes/userroute.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderroute.js";
import uploadRouter from "./routes/upload.route.js";

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then((conn) => console.log(`connected to db at ${conn.connection.host}`))
.catch((err) => console.log("error connecting to db", err.message));

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "API is running" });
});

app.use(cookieParser());
app.use(logger);

app.use("/api/products", productRouter);
app.use("/api/auth", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.listen(3000, () => console.log("Server is up and running"));