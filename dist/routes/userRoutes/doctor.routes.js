"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _doctorController = require("../../controllers/userControllers/doctor.controller.js");
var _expressValidator = require("express-validator");
var _validateFields = require("../../middlewares/validateFields.js");
var _validateJwt = require("../../middlewares/validateJwt.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/register", [(0, _expressValidator.check)("first_name", "First Name is required").not().isEmpty(), (0, _expressValidator.check)("last_name", "Last Name is required").not().isEmpty(), (0, _expressValidator.check)("username", "Username is required").not().isEmpty(), (0, _expressValidator.check)("email", "Email is required").isEmail(), (0, _expressValidator.check)("password", "Password is required").not().isEmpty(), (0, _expressValidator.check)("speciality", "Speciality is required").not().isEmpty(), (0, _expressValidator.check)("phone", "Phone is required").not().isEmpty(), (0, _expressValidator.check)("office_room", "Office Room is required").not().isEmpty(), _validateFields.validateFields], _validateJwt.validateJwt.isAdministrator, _doctorController.registerDoctor); // Register Doctor

router.post("/login", [(0, _expressValidator.check)("email", "Email is required").isEmail(), (0, _expressValidator.check)("password", "Password is required").not().isEmpty(), _validateFields.validateFields], _doctorController.loginDoctor); // Login Doctor

router.get("/all", _validateJwt.validateJwt.isAdministratorOrDoctorOrPatient, _doctorController.getDoctors); // Get Doctors

router.get("/:id", _validateJwt.validateJwt.isAdministratorOrDoctorOrPatient, _doctorController.getDoctorById); // Get Doctor by ID

router.post('/forgot-password', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), _validateFields.validateFields], _doctorController.forgotPassword);
router.post('/reset-password/:resetToken', [(0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password must be at least 6 characters').isLength({
  min: 6
}), _validateFields.validateFields], _doctorController.resetPassword);
router.put('update/:id', _validateJwt.validateJwt.isAdministratorOrDoctor, _doctorController.updateDoctor); // Update Doctor
var _default = router;
exports.default = _default;