import Sequelize from "sequelize";
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect : 'mysql',
    database : 'CheckmateDB', //numele bazei de date
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    logging : false,
    //host daca avem mai multe date
    define : {
        timestamps : true, //aici era pe fals dar vedem ca si noi avem nevoie de timestamp-urile din tabela
        freezeTableName : true, //daca schimbam baza de date 
    }
}
)

export default db;