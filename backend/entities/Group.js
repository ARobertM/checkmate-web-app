import db from '../dbConfig.js'; //pobil cu 2 pct (nu stiu sigur,vedem)
import  { Sequelize } from "sequelize";

const Group = db.define('Group', {
    GroupId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    GroupDetails : {
        type : Sequelize.STRING
    },
    UserId: {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    EventId: {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
})

export default Group;