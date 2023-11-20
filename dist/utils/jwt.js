"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renewToken = exports.createJwt = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createJwt = id => {
  try {
    const payload = {
      id
    };
    const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    return token;
  } catch (error) {
    console.error('Error creating JWT:', error);
    throw new Error('Failed to create JWT');
  }
};
exports.createJwt = createJwt;
const renewToken = expiredToken => {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(expiredToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return reject(err);
      }

      // Emite un nuevo token con una nueva fecha de expiración
      const newToken = _jsonwebtoken.default.sign({
        id: decoded.id
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      resolve(newToken);
    });
  });
};
exports.renewToken = renewToken;