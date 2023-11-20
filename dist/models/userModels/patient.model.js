"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
var _appointmentsModel = _interopRequireDefault(require("../featureModels/appointments.model.js"));
var _medhistoryModel = require("../featureModels/medhistory.model.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Patient = _initDb.default.define("patient", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  dob: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  gender: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  resetPasswordToken: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpire: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  role: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: "PATIENT",
    // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: 'PENDING',
    // 'pending', 'confirmed', 'rejected'
    allowNull: false
  }
});
_appointmentsModel.default.belongsTo(Patient, {
  foreignKey: 'patient_id'
});
Patient.hasMany(_appointmentsModel.default, {
  foreignKey: 'patient_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Patient.hasOne(_medhistoryModel.MedHistory, {
  foreignKey: 'patient_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
var _default = Patient;
exports.default = _default;