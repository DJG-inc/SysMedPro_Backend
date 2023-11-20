"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _appointmentController = require("../../controllers/featureControllers/appointment.controller.js");
var _expressValidator = require("express-validator");
var _validateFields = require("../../middlewares/validateFields.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/create/:id', _appointmentController.createAppointment);
router.get('/all', _appointmentController.getAllAppointments);
router.get('/:id', _appointmentController.getAppointmentById);
router.put('/:id', _appointmentController.updateAppointmentById);
router.delete('/:id', _appointmentController.deleteAppointmentById);
router.get('/patient/:id', _appointmentController.getAllAppointmentsByPatientId);
router.get('/doctor/:id', _appointmentController.getAllAppointmentsByDoctorId);
router.get('/confirmed/:id', _appointmentController.getAppointmentsConfirmed);
router.get('/pending/:id', _appointmentController.getAppointmentsPending);
router.get('/cancelled/:id', _appointmentController.getAppointmentsCancelled);
router.put('/confirmed/:id', _appointmentController.updateAppointentConfirmed);
router.put('/cancelled/:id', _appointmentController.updateAppointentCancelled);
var _default = router;
exports.default = _default;