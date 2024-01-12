import db from '../dbConfig.js'; //pobil cu 2 pct (nu stiu sigur,vedem)
import  { Sequelize } from "sequelize";

const Event = db.define('Event', {
    EventId: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    EventDescription : {
        type : Sequelize.STRING
    },
    EventStartDate : {
        type : Sequelize.DATE,
        allowNull : false,
    },
    EventEndDate : {
        type : Sequelize.DATE,
        allowNull : false,
    },
    EventStatus : {
        type : Sequelize.ENUM('ORGANIZATOR', 'PARTICIPANT'),
        allowNull : false,
    },
    EventCodAccess : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    UserId: {
        type : Sequelize.INTEGER,
        allowNull : false,
    }
})

export default Event;

