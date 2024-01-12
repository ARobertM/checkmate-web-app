import express from "express";
import env from 'dotenv';
import DB_Init from "./entities/DB_init.js";

let app = express();

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DB_Init();

let port = process.env.PORT || 9000;
app.listen(port);
console.log("Server is running on port " + port);