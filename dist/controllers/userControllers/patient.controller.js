"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePatient = exports.resetPassword = exports.registerPatient = exports.patientRejection = exports.loginPatient = exports.getPatients = exports.getPatientById = exports.forgotPassword = exports.filterPatientsForStatusPending = exports.filterPatientsForStatusConfirmedWithPriority = exports.filterPatientsForStatusConfirmed = exports.confirmPatient = void 0;
var _patientModel = _interopRequireDefault(require("../../models/userModels/patient.model.js"));
var _appointmentsModel = _interopRequireDefault(require("../../models/featureModels/appointments.model.js"));
var _medhistoryModel = require("../../models/featureModels/medhistory.model.js");
var _sequelize = require("sequelize");
var _crypto = _interopRequireDefault(require("crypto"));
var _nodemailer = require("../../utils/nodemailer.js");
var _jwt = require("../../utils/jwt.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _heap = require("../../utils/heap.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerPatient = async (req, res) => {
  try {
    const salt = _bcrypt.default.genSaltSync(10);
    const hash = _bcrypt.default.hashSync(req.body.password, salt);

    //verify if patient already exists
    const patient = await _patientModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (patient) {
      return res.status(409).json({
        message: "Patient already exists"
      });
    }

    //create patient
    const newPatient = await _patientModel.default.create({
      email: req.body.email,
      username: req.body.username,
      password: hash
    });
    if (!newPatient) {
      return res.status(400).json({
        message: "Patient could not be created"
      });
    }

    //enviar email de bienvenida
    await (0, _nodemailer.sendMail)({
      to: newPatient.email,
      subject: `Welcome ${newPatient.username} to SysMedPro`,
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Welcome ${newPatient.username} to SysMedPro</h1><p style="text-align:center;">We are glad to have you here and we hope you enjoy our services and help us improve them in the future.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
    });
    return res.status(200).json({
      message: "Patient created successfully",
      newPatient
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.registerPatient = registerPatient;
const loginPatient = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    const isMatch = _bcrypt.default.compareSync(req.body.password, patient.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
    const token = (0, _jwt.createJwt)(patient.id);
    return res.status(200).json({
      patient,
      token,
      message: "Patient logged in successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//llena los campos que estan null del paciente
exports.loginPatient = loginPatient;
const confirmPatient = async (req, res) => {
  try {
    //por el id del paciente, buscar en la tabla de pacientes
    const patient = await _patientModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    const updatedPatient = await _patientModel.default.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      status: "CONFIRMED"
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedPatient) {
      return res.status(400).json({
        message: "Patient could not be updated"
      });
    }
    return res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.confirmPatient = confirmPatient;
const patientRejection = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    const updatedPatient = await _patientModel.default.update({
      status: "rejected"
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedPatient) {
      return res.status(400).json({
        message: "Patient could not be updated"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.patientRejection = patientRejection;
const getPatientById = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        id: req.params.id
      },
      //incluir los datos de la tabla de citas y de la tabla de historial medico
      include: [{
        model: _appointmentsModel.default,
        as: "appointments"
      }, {
        model: _medhistoryModel.MedHistory,
        as: "medhistory",
        include: [{
          model: _medhistoryModel.MedReport,
          as: "medreports"
        }]
      }]
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    return res.status(200).json({
      patient
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getPatientById = getPatientById;
const getPatients = async (req, res) => {
  try {
    const patients = await _patientModel.default.findAll({
      include: [{
        model: _appointmentsModel.default,
        as: "appointments"
      }, {
        model: _medhistoryModel.MedHistory,
        as: "medhistory",
        include: [{
          model: _medhistoryModel.MedReport,
          as: "medreports"
        }]
      }]
    });
    return res.status(200).json({
      patients
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getPatients = getPatients;
const forgotPassword = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    //generar token de reseteo de contraseña
    const resetToken = _crypto.default.randomBytes(32).toString("hex");
    const resetPasswordToken = _crypto.default.createHash("sha256").update(resetToken).digest("hex");

    //guardar el token en la base de datos
    await _patientModel.default.update({
      resetPasswordToken,
      resetPasswordExpire: Date.now() + 10 * (60 * 1000)
    }, {
      where: {
        id: patient.id
      }
    });

    //enviar email con el token
    await (0, _nodemailer.sendMail)({
      to: patient.email,
      subject: "Reset your password for SysMedPro",
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Reset your password for SysMedPro</h1><p style="text-align:center;">Please click the link below to reset your password.</p><a href="https://sysmedpro.netlify.app/resetpassword/${resetToken}" style="display:block;margin-left:auto;margin-right:auto;text-align:center;">Reset password</a><p style="text-align:center;">If you did not request a password reset, please ignore this email.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
    });
    return res.status(200).json({
      message: "Email sent"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
  try {
    //buscar el paciente por el token
    const patient = await _patientModel.default.findOne({
      where: {
        resetPasswordToken: _crypto.default.createHash("sha256").update(req.params.resetToken).digest("hex"),
        resetPasswordExpire: {
          [_sequelize.Op.gt]: Date.now()
        }
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    //si el token expiro o no existe enviar error
    if (!patient.resetPasswordToken || !patient.resetPasswordExpire) {
      return res.status(400).json({
        message: "Invalid token"
      });
    }

    //actualizar la contraseña
    const salt = _bcrypt.default.genSaltSync(10);
    const hash = _bcrypt.default.hashSync(req.body.password, salt);
    await _patientModel.default.update({
      password: hash,
      resetPasswordToken: null,
      resetPasswordExpire: null
    }, {
      where: {
        id: patient.id
      }
    });

    //enviar email de confirmacion
    await (0, _nodemailer.sendMail)({
      to: patient.email,
      subject: "Your password has been changed",
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Your password has been changed</h1><p style="text-align:center;">This is a confirmation that the password for your account ${patient.email} has just been changed.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
    });
    return res.status(200).json({
      message: "Password updated successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//---------------------------------------------------------------------------------------------//
exports.resetPassword = resetPassword;
const filterPatientsForStatusConfirmed = async (req, res) => {
  try {
    const patients = await _patientModel.default.findAll({
      where: {
        status: "CONFIRMED"
      },
      include: [{
        model: _appointmentsModel.default,
        as: "appointments"
      }, {
        model: _medhistoryModel.MedHistory,
        as: "medhistory",
        include: [{
          model: _medhistoryModel.MedReport,
          as: "medreports"
        }]
      }]
    });
    return res.status(200).json({
      patients
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.filterPatientsForStatusConfirmed = filterPatientsForStatusConfirmed;
const filterPatientsForStatusPending = async (req, res) => {
  try {
    const patients = await _patientModel.default.findAll({
      where: {
        status: "PENDING"
      },
      include: [{
        model: _appointmentsModel.default,
        as: "appointments"
      }, {
        model: _medhistoryModel.MedHistory,
        as: "medhistory",
        include: [{
          model: _medhistoryModel.MedReport,
          as: "medreports"
        }]
      }]
    });
    return res.status(200).json({
      patients
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//filtar pacientes con monticulos // CONROLADOR DE PRUEBA
exports.filterPatientsForStatusPending = filterPatientsForStatusPending;
const addPatientToHeap = patient => {
  (0, _heap.addToHeap)(patient);
};
const getPatientsByPriorityFromHeap = () => {
  return (0, _heap.getPatientsByPriority)();
};
const filterPatientsForStatusConfirmedWithPriority = async (req, res) => {
  try {
    const patients = await _patientModel.default.findAll({
      where: {
        status: "CONFIRMED"
      },
      include: [{
        model: _appointmentsModel.default,
        as: "appointments"
      }, {
        model: _medhistoryModel.MedHistory,
        as: "medhistory",
        include: [{
          model: _medhistoryModel.MedReport,
          as: "medreports"
        }]
      }]
    });
    patients.forEach(patient => {
      addPatientToHeap(patient);
    });
    const patientsByPriority = getPatientsByPriorityFromHeap();
    return res.status(200).json({
      patientsByPriority
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//updated patient
exports.filterPatientsForStatusConfirmedWithPriority = filterPatientsForStatusConfirmedWithPriority;
const updatePatient = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }
    const updatedPatient = await _patientModel.default.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedPatient) {
      return res.status(400).json({
        message: "Patient could not be updated"
      });
    }
    return res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.updatePatient = updatePatient;