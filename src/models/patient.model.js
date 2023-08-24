import { DataTypes } from "sequelize";
import db from "./../dataBase/initDb.js";
import Appointment from "./appointments.model.js";
import { MedHistory } from "./medhistory.model.js";

const Patient = db.define("patient", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
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
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
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
    defaultValue: "PATIENT", // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING', // 'pending', 'confirmed', 'rejected'
    allowNull: false,
  },
});

Appointment.belongsTo(Patient, {
    foreignKey: 'patient_id',
});

Patient.hasMany(Appointment, {
    foreignKey: 'patient_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Patient.hasOne(MedHistory, {
    foreignKey: 'patient_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default Patient;
