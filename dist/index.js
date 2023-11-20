"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _serverModel = _interopRequireDefault(require("./models/serverModel/server.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const server = new _serverModel.default();
server.listen();