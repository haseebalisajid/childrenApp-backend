import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Api Working!" });
});

app.use("/api/v1", userRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(4000, () =>
            console.log("Server started on port http://localhost:4000"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();