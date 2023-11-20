"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _medhistoryController = require("../../controllers/featureControllers/medhistory.controller.js");
var _expressValidator = require("express-validator");
var _validateFields = require("../../middlewares/validateFields.js");
var _validateJwt = require("../../middlewares/validateJwt.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/create/:patient_id', [(0, _expressValidator.check)('dor', 'Date of report is required').not().isEmpty(), _validateFields.validateFields], _validateJwt.validateJwt.isDoctor, _medhistoryController.createMedHistory);
router.post('/create/report/:medhistory_id', [(0, _expressValidator.check)('report_details', 'Report details is required').not().isEmpty(), (0, _expressValidator.check)('dor', 'Date of report is required').not().isEmpty(), _validateFields.validateFields], _validateJwt.validateJwt.isDoctor, _medhistoryController.createMedReport);
var _default = router;
exports.default = _default;