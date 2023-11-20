"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Administrator = _initDb.default.define("administrators", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  role: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "ADMINISTRATOR" // 'PATIENT', 'DOCTOR', 'ADMINISTRATOR'
  }
});
var _default = Administrator;
exports.default = _default;