import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
// import config from "./config";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
// import userRoute from "./routes/userRoute";

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("CONNECTED TO DB");
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});