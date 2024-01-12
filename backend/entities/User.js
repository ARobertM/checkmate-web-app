import db from './dbConfig.js'; //pobil cu 2 pct (nu stiu sigur,vedem)
import  { Sequelize } from "sequelize";

const User = db.define('User', {
    UserId: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    UserFirstName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    UserLastName : {
        type: Sequelize.STRING,
        allowNull : false,
    },
    UserEmail : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    UserRole : {
        type : Sequelize.STRING,
        allowNull : false,
    }
})

export default User;