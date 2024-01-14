import db from "../dbConfig.js"; 
import { Sequelize } from "sequelize";

const Event = db.define("Event", {
  EventId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  EventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  EventDescription: {
    type: Sequelize.STRING,
  },
  EventStartDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  EventEndDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  EventStatus: {
    type: Sequelize.ENUM("OPEN", "CLOSED"),
    allowNull: false,
  },
  EventCodAccess: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  GroupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  UserId:{
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

export default Event;
