import express from "express";
import env from 'dotenv';
import DB_Init from "./entities/DB_init.js";
import createDbRouter from "./routes/createDbRoute.js";

let app = express();

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DB_Init();
app.use("/api", createDbRouter);

let port = process.env.PORT || 9000;
app.listen(port);
console.log("Server is running on port " + port);