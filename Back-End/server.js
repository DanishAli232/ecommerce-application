import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
// import config from "./config";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
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

// const mongodbUrl = config.MONGODB_URL;
// mongoose
//     .connect(mongodbUrl, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//     })
//     .catch((error) => console.log(error.reason));

const app = express();

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});