import db from './dbConfig.js'; //pobil cu 2 pct (nu stiu sigur,vedem)
import  { Sequelize } from "sequelize";

const AttendanceList = db.define('AttendanceList', {
    AttendanceListId:{
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    UserId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    EventId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    AttendanceListCreateDate : {
        type : Sequelize.DATE,
        allowNull : false,
    }
})

export default AttendanceList;