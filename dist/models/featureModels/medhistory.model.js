"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MedReport = exports.MedHistory = void 0;
var _sequelize = require("sequelize");
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MedHistory = _initDb.default.define("medhistory", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  dor: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  patient_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "patients",
      key: "id"
    }
  }
});
exports.MedHistory = MedHistory;
const MedReport = _initDb.default.define("medreport", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  report_details: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  dor: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  medhistory_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medhistories',
      key: 'id'
    }
  }
});
exports.MedReport = MedReport;
MedHistory.hasMany(MedReport, {
  foreignKey: 'medhistory_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});