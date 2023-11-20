"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Appointment = _initDb.default.define("appointments", {
  // PK
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  reasonForVisit: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: "PENDING",
    // pending, confirmed, cancelled
    allowNull: false
  },
  // FK
  patient_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "patients",
      key: "id"
    }
  },
  doctor_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "doctors",
      key: "id"
    }
  }
});
var _default = Appointment;
exports.default = _default;