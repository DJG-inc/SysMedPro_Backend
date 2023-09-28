import { DataTypes } from "sequelize";
import db from "../../database/initDb.js";
import Appointment from "../featureModels/appointments.model.js";

const Doctor = db.define("doctor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speciality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  office_room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpire: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "DOCTOR", // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
  },
});

Appointment.belongsTo(Doctor, {
  foreignKey: "doctor_id",
});

Doctor.hasMany(Appointment, {
    foreignKey: 'doctor_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default Doctor;
