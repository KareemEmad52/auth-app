import express from "express";
import env from "dotenv";
import {DBConnection} from "./Database/DBConnection.js"
import userRouter from "./src/modules/user/routes/router.js"
import { AppError } from "./src/utils/error.handles.js";
import cros from "cors"

env.config();
const server = express();
server.use(express.json())
server.use(cros())

port = +process.env.PORT

server.use('/user',userRouter)

server.all("*", (req, res, next) => {
    throw new AppError("Route not found", 404);
});

server.use((err, req, res, next) => {
    const { status, stack, message } = err;
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === "development" && { stack }),
    });
});

DBConnection()
server.listen(port, () => console.log('server is running...'));
