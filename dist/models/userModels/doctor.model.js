"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
var _appointmentsModel = _interopRequireDefault(require("../featureModels/appointments.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Doctor = _initDb.default.define("doctor", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  speciality: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  office_room: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
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
    allowNull: false,
    defaultValue: "DOCTOR" // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
  }
});

_appointmentsModel.default.belongsTo(Doctor, {
  foreignKey: "doctor_id"
});
Doctor.hasMany(_appointmentsModel.default, {
  foreignKey: 'doctor_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
var _default = Doctor;
exports.default = _default;