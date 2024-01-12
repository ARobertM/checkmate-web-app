import db from './dbConfig.js'; //pobil cu 2 pct (nu stiu sigur,vedem)
import  { Sequelize } from "sequelize";

const EventGroup = db.define('EventGroup', {
    EventId: {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
    },
    GroupId: {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
    }
})

export default EventGroup;