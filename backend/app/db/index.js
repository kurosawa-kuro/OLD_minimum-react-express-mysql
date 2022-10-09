import * as dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DATABASE_DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    });

// sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();