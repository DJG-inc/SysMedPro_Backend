import { DataTypes } from "sequelize";
import db from "../../database/initDb.js";

const Administrator = db.define("administrators", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "ADMINISTRATOR", // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
  },
});

export default Administrator;
