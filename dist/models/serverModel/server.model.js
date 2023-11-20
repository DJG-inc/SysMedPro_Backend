"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _initDb = _interopRequireDefault(require("../../database/initDb.js"));
var _cors = _interopRequireDefault(require("cors"));
var _errorHandler = _interopRequireDefault(require("../../middlewares/error.handler.js"));
var _doctorRoutes = _interopRequireDefault(require("../../routes/userRoutes/doctor.routes.js"));
var _patientRoutes = _interopRequireDefault(require("../../routes/userRoutes/patient.routes.js"));
var _appointmentsRoutes = _interopRequireDefault(require("../../routes/featureRoutes/appointments.routes.js"));
var _medicalHistoryRoutes = _interopRequireDefault(require("../../routes/featureRoutes/medicalHistory.routes.js"));
var _adminRoutes = _interopRequireDefault(require("../../routes/userRoutes/admin.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Server {
  constructor() {
    this.app = (0, _express.default)();
    this.port = process.env.PORT || 3000;
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  async dbConnection() {
    try {
      await _initDb.default.authenticate();
      console.log('Connection has been established successfully.');
      await _initDb.default.sync();
      console.log("All models were synchronized successfully.");
    } catch (error) {
      throw new Error(error);
    }
  }
  middlewares() {
    this.app.use((0, _cors.default)({
      origin: '*'
    }));
    this.app.use(_express.default.json());
    this.app.use(_express.default.urlencoded({
      extended: true
    }));
    this.app.use(_errorHandler.default);
  }
  routes() {
    this.app.use(`/api/${process.env.API_VERSION}/patients`, _patientRoutes.default);
    this.app.use(`/api/${process.env.API_VERSION}/appointments`, _appointmentsRoutes.default);
    this.app.use(`/api/${process.env.API_VERSION}/doctors`, _doctorRoutes.default);
    this.app.use(`/api/${process.env.API_VERSION}/medicalhistory`, _medicalHistoryRoutes.default);
    this.app.use(`/api/${process.env.API_VERSION}/admin`, _adminRoutes.default);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}
var _default = Server;
exports.default = _default;