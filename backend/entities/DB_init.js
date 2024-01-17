import mysql from "mysql2/promise";
import env from 'dotenv';
import AttendanceList from "./AttendanceList.js";
import Event from "./Event.js";

import Group from "./Group.js";
import User from "./User.js";


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

function FK_Config(){
    // 1-n
    Group.hasMany(Event, { as: 'Evenimente', foreignKey: 'GroupId' });
    Event.belongsTo(Group, { foreignKey: 'GroupId' });

    //1-n pentru a vedea ce user a creat un event
    //User.hasMany(Event,{as:'Evenimente',foreignKey:'UserId'});
    //Event.belongsTo(User, { foreignKey: 'UserId' });

    //1-n pentru a vedea ce user a creat un grup
    User.hasMany(Group,{as:'Grupuri',foreignKey:'UserId'});
    Group.belongsTo(User, { foreignKey: 'UserId' });

    // --------------------- asociere n-n -------------------------------------
    Event.belongsToMany(User, {through: "AttendanceList", as : "Users", foreignKey: "EventId"});
    User.belongsToMany(Event, {through: "AttendanceList", as : "Events", foreignKey: "UserId"});

}

function DB_Init(){
    create_db();
    FK_Config();
    
}

export default DB_Init;