import { DataTypes } from "sequelize";
import db from "./../dataBase/initDb.js";

const Appointment = db.define("appointments", {
  // PK
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reasonForVisit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING", // pending, confirmed, cancelled
    allowNull: false,
  },
  // FK
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "patients",
      key: "id",
    },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "doctors",
      key: "id",
    },
  },
});

export default Appointment;
