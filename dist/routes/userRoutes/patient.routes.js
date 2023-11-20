"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _patientController = require("../../controllers/userControllers/patient.controller.js");
var _expressValidator = require("express-validator");
var _validateFields = require("../../middlewares/validateFields.js");
var _validateJwt = require("../../middlewares/validateJwt.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/register', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), (0, _expressValidator.check)('username', 'Username is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password must be at least 6 characters').isLength({
  min: 6
}), _validateFields.validateFields], _patientController.registerPatient);
router.post('/login', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), (0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), _validateFields.validateFields], _patientController.loginPatient);
router.post('/confirm/:id', [(0, _expressValidator.check)('first_name', 'First name is required').not().isEmpty(), (0, _expressValidator.check)('last_name', 'Last name is required').not().isEmpty(), (0, _expressValidator.check)('phone', 'Phone is required').not().isEmpty(), (0, _expressValidator.check)('dob', 'Date of birth is required').not().isEmpty(), (0, _expressValidator.check)('gender', 'Gender is required').not().isEmpty(), (0, _expressValidator.check)('address', 'Address is required').not().isEmpty(), _validateFields.validateFields], _validateJwt.validateJwt.isPatient, _patientController.confirmPatient);
router.get('/all', _validateJwt.validateJwt.isAdministratorOrDoctor, _patientController.getPatients);
router.get('/:id', _validateJwt.validateJwt.isAdministratorOrDoctor, _patientController.getPatientById);
router.put('/reject/:id', _validateJwt.validateJwt.isAdministrator, _patientController.patientRejection);
router.post('/forgot-password', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), _validateFields.validateFields], _patientController.forgotPassword);
router.post('/reset-password/:resetToken', [(0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password must be at least 6 characters').isLength({
  min: 6
}), _validateFields.validateFields], _patientController.resetPassword);
router.put('/:id', _validateJwt.validateJwt.isPatient, _patientController.updatePatient);
var _default = router;
exports.default = _default;