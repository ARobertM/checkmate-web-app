import mysql from "mysql2/promise";
import env from 'dotenv';

env.config();

function create_db(){
    let conn;

    mysql.createConnection({
        user:process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
    }).then((connection) => {
        conn = connection;
        return conn.query("CREATE DATABASE IF NOT EXISTS CheckmateDB");
    }).then(() => {
        return conn.end();
    }).catch((err) => {
        console.warn(err.stack);
    })
}

function DB_Init(){
    create_db();
    
}

export default DB_Init;