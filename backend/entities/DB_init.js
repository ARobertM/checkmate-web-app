import mysql from "mysql2/promise";
import env from 'dotenv';
import AttendanceList from "./AttendanceList.js";
import Event from "./Event.js";
import EventGroup from "./EventsGroup.js";
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
    User.hasMany(Event, { as: 'Evenimente', foreignKey: 'UserId' });
    Event.belongsTo(User, { foreignKey: 'UserId' });

    User.hasMany(Group, { as: 'Grupuri', foreignKey: 'UserId' });
    Group.belongsTo(User, { foreignKey: 'UserId' });

    Event.belongsToMany(EventGroup, { through: 'EventGroupEvent', as: 'GrupuriEvenimente', foreignKey: 'EventId' });
    EventGroup.belongsToMany(Event, { through: 'EventGroupEvent', as: 'Evenimente', foreignKey: 'EventGroupId' });

    Event.hasOne(AttendanceList, { as: 'ListaParticipare', foreignKey: 'EventId' });
    AttendanceList.belongsTo(Event, { as: 'Eveniment', foreignKey: 'EventId' });

}

function DB_Init(){
    create_db();
    FK_Config();
    
}

export default DB_Init;