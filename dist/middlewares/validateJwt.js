"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJwt = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _administratorModel = _interopRequireDefault(require("../models/userModels/administrator.model.js"));
var _doctorModel = _interopRequireDefault(require("../models/userModels/doctor.model.js"));
var _patientModel = _interopRequireDefault(require("../models/userModels/patient.model.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jwt = require("../utils/jwt.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const isAdministrator = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const administrator = await _administratorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!administrator) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.administrator = administrator;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
const isDoctor = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!doctor) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.doctor = doctor;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
const isPatient = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const patient = await _patientModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!patient) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

//verificar si es administrador o doctor

const isAdministratorOrDoctor = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const administrator = await _administratorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!administrator && !doctor) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.administrator = administrator;
    req.doctor = doctor;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

//verificar si es administrador o doctor o paciente

const isAdministratorOrDoctorOrPatient = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const administrator = await _administratorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    const patient = await _patientModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!administrator && !doctor && !patient) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.administrator = administrator;
    req.doctor = doctor;
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

//verificar si es administrador o paciente

const isAdministratorOrPatient = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const administrator = await _administratorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    const patient = await _patientModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!administrator && !patient) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.administrator = administrator;
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

//verificar si es doctor o paciente

const isDoctorOrPatient = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        error: 'Please provide a valid token.'
      });
    }
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
        // El token ha expirado; intenta renovarlo
        const newToken = await (0, _jwt.renewToken)(token);
        if (!newToken) {
          return res.status(401).json({
            error: 'Failed to renew token.'
          });
        }

        // Actualiza la solicitud con el nuevo token
        req.headers['Authorization'] = `Bearer ${newToken}`;

        // Decodifica el nuevo token
        decoded = _jsonwebtoken.default.decode(newToken);
      } else {
        return res.status(401).json({
          error: 'Invalid token.'
        });
      }
    }
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    const patient = await _patientModel.default.findOne({
      where: {
        id: decoded.id
      }
    });
    if (!doctor && !patient) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }
    req.doctor = doctor;
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
const validateJwt = {
  isAdministrator,
  isDoctor,
  isPatient,
  isAdministratorOrDoctor,
  isAdministratorOrDoctorOrPatient,
  isAdministratorOrPatient,
  isDoctorOrPatient
};
exports.validateJwt = validateJwt;