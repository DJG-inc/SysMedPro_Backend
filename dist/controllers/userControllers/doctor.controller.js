"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDoctor = exports.resetPassword = exports.registerDoctor = exports.loginDoctor = exports.getDoctors = exports.getDoctorById = exports.forgotPassword = void 0;
var _doctorModel = _interopRequireDefault(require("../../models/userModels/doctor.model.js"));
var _patientModel = _interopRequireDefault(require("../../models/userModels/patient.model.js"));
var _appointmentsModel = _interopRequireDefault(require("../../models/featureModels/appointments.model.js"));
var _sequelize = require("sequelize");
var _crypto = _interopRequireDefault(require("crypto"));
var _nodemailer = require("../../utils/nodemailer.js");
var _jwt = require("../../utils/jwt.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerDoctor = async (req, res) => {
  try {
    const salt = _bcrypt.default.genSaltSync(10);
    const hash = _bcrypt.default.hashSync(req.body.password, salt);
    const doctor = await _doctorModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (doctor) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }
    const newDoctor = await _doctorModel.default.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      username: req.body.username,
      phone: req.body.phone,
      office_room: req.body.office_room,
      speciality: req.body.speciality
    });
    if (!newDoctor) {
      return res.status(400).json({
        error: "Doctor could not be created"
      });
    }
    await (0, _nodemailer.sendMail)({
      to: newDoctor.email,
      subject: `Welcome ${newDoctor.username} to SysMedPro`,
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Welcome ${newDoctor.username} to SysMedPro</h1><p style="text-align:center;">We are glad to have you here and we hope you enjoy our services and help us improve them in the future.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
    });
    return res.status(200).json({
      message: "Doctor created successfully",
      newDoctor
    });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.registerDoctor = registerDoctor;
const loginDoctor = async (req, res) => {
  try {
    const doctor = await _doctorModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found"
      });
    }
    const isMatch = _bcrypt.default.compareSync(req.body.password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }
    const token = (0, _jwt.createJwt)(doctor.id);
    return res.status(200).json({
      token,
      doctor
    });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.loginDoctor = loginDoctor;
const getDoctorById = async (req, res) => {
  try {
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: _appointmentsModel.default,
        as: "appointments",
        include: [{
          model: _patientModel.default,
          as: "patient"
        }]
      }]
    });
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found"
      });
    }
    return res.status(200).json({
      doctor
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getDoctorById = getDoctorById;
const getDoctors = async (req, res) => {
  try {
    const doctors = await _doctorModel.default.findAll({
      include: [{
        model: _appointmentsModel.default,
        as: "appointments",
        include: [{
          model: _patientModel.default,
          as: "patient"
        }]
      }]
    });
    if (!doctors) {
      return res.status(404).json({
        error: "Doctors not found"
      });
    }
    return res.status(200).json({
      doctors
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getDoctors = getDoctors;
const forgotPassword = async (req, res) => {
  try {
    const doctor = await _doctorModel.default.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    //generar token de reseteo de contraseña
    const resetToken = _crypto.default.randomBytes(32).toString("hex");
    const resetPasswordToken = _crypto.default.createHash("sha256").update(resetToken).digest("hex");

    //guardar el token en la base de datos
    await _doctorModel.default.update({
      resetPasswordToken,
      resetPasswordExpire: Date.now() + 10 * (60 * 1000)
    }, {
      where: {
        id: doctor.id
      }
    });

    //enviar email con el token
    await (0, _nodemailer.sendMail)({
      to: doctor.email,
      subject: "Reset your password for SysMedPro",
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Reset your password for SysMedPro</h1><p style="text-align:center;">Please click the link below to reset your password</p><a href="https://sysmedpro.netlify.app/resetpassword/${resetToken}" style="display:block;margin-left:auto;margin-right:auto;text-align:center;">Reset password</a><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
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
    const doctor = await _doctorModel.default.findOne({
      where: {
        resetPasswordToken: _crypto.default.createHash("sha256").update(req.params.resetToken).digest("hex"),
        resetPasswordExpire: {
          [_sequelize.Op.gt]: Date.now()
        }
      }
    });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }
    //si el token expiro o no existe enviar error
    if (!doctor.resetPasswordToken || !doctor.resetPasswordExpire) {
      return res.status(400).json({
        message: "Invalid token"
      });
    }

    //actualizar la contraseña
    const salt = _bcrypt.default.genSaltSync(10);
    const hash = _bcrypt.default.hashSync(req.body.password, salt);
    await _doctorModel.default.update({
      password: hash,
      resetPasswordToken: null,
      resetPasswordExpire: null
    }, {
      where: {
        id: doctor.id
      }
    });

    //enviar email de confirmacion
    await (0, _nodemailer.sendMail)({
      to: doctor.email,
      subject: "Your password has been changed",
      html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Your password has been changed</h1><p style="text-align:center;">Hello ${doctor.username},</p><p style="text-align:center;">This is a confirmation that the password for your account ${doctor.email} has just been changed.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
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
exports.resetPassword = resetPassword;
const updateDoctor = async (req, res) => {
  try {
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found"
      });
    }
    const updatedDoctor = await _doctorModel.default.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedDoctor) {
      return res.status(400).json({
        error: "Doctor could not be updated"
      });
    }
    return res.status(200).json({
      message: "Doctor updated successfully",
      updatedDoctor
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.updateDoctor = updateDoctor;