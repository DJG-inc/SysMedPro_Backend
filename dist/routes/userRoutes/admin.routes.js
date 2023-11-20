"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../../controllers/userControllers/admin.controller.js");
var _expressValidator = require("express-validator");
var _validateFields = require("../../middlewares/validateFields.js");
var _validateJwt = require("../../middlewares/validateJwt.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/login', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), (0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), _validateFields.validateFields], _adminController.loginAdmin);
router.get('/renew', _validateJwt.validateJwt.isAdministrator, (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew'
  });
});
router.post('/register', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), (0, _expressValidator.check)('username', 'Username is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), _validateFields.validateFields], _adminController.registerAdmin);
router.post('/forgot-password', [(0, _expressValidator.check)('email', 'Email is required').isEmail(), _validateFields.validateFields], _adminController.forgotPassword);
router.post('/reset-password/:resetToken', [(0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password must be at least 6 characters').isLength({
  min: 6
}), _validateFields.validateFields], _adminController.resetPassword);
var _default = router;
exports.default = _default;