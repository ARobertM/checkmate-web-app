import express from "express";
import env from 'dotenv';
import DB_Init from "./entities/DB_init.js";
import createDbRouter from "./routes/createDbRoute.js";
import eventRouter from "./routes/EventRouter.js";
import userRouter from "./routes/UserRouter.js";
import groupRouter from "./routes/GroupRouter.js";

let app = express();

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DB_Init();
app.use("/api", createDbRouter);
app.use("/api", eventRouter);
app.use("/api",userRouter);
app.use("/api",groupRouter);

let port = process.env.PORT || 9000;
app.listen(port);
console.log("Server is running on port " + port);