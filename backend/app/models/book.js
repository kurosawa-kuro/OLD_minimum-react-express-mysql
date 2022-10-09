import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
});