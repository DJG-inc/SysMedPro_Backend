"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointmentById = exports.updateAppointentConfirmed = exports.updateAppointentCancelled = exports.getAppointmentsPending = exports.getAppointmentsConfirmed = exports.getAppointmentsCancelled = exports.getAppointmentById = exports.getAllAppointmentsByPatientId = exports.getAllAppointmentsByDoctorId = exports.getAllAppointments = exports.deleteAppointmentById = exports.createAppointment = void 0;
var _patientModel = _interopRequireDefault(require("../../models/userModels/patient.model.js"));
var _doctorModel = _interopRequireDefault(require("../../models/userModels/doctor.model.js"));
var _appointmentsModel = _interopRequireDefault(require("../../models/featureModels/appointments.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//create appointment con el id del doctor y el id del paciente
const createAppointment = async (req, res) => {
  try {
    const patient = await _patientModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!patient) {
      return res.status(401).json({
        message: "Patient not found"
      });
    }
    //buscar el doctor por el id mandado en el body
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: req.body.doctor_id
      }
    });
    if (!doctor) {
      return res.status(402).json({
        message: "Doctor not found"
      });
    }
    //vificar que la fecha de la cita no sea menor a la fecha actual
    const date = new Date(req.body.date);
    const currentDate = new Date();
    if (date < currentDate) {
      return res.status(403).json({
        message: "Date cannot be in the past"
      });
    }
    //verificar que el doctor no tenga una cita en la misma fecha
    const verifyappointment = await _appointmentsModel.default.findOne({
      where: {
        date: req.body.date,
        doctor_id: req.body.doctor_id
      }
    });
    if (verifyappointment) {
      return res.status(404).json({
        message: "Doctor already has an appointment"
      });
    }
    //verificar que el doctor exista
    const verifyDoctor = await _doctorModel.default.findOne({
      where: {
        id: req.body.doctor_id
      }
    });
    if (!verifyDoctor) {
      return res.status(405).json({
        message: "Doctor not found"
      });
    }
    //crear la cita con los datos mandados en el body
    const appointment = await _appointmentsModel.default.create({
      date: req.body.date,
      reasonForVisit: req.body.reasonForVisit,
      patient_id: req.params.id,
      doctor_id: req.body.doctor_id
    });
    return res.status(200).json({
      appointment
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//get appointment by id
exports.createAppointment = createAppointment;
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await _appointmentsModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//get all appointments
exports.getAppointmentById = getAppointmentById;
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await _appointmentsModel.default.findAll();
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//update appointment by id
exports.getAllAppointments = getAllAppointments;
const updateAppointmentById = async (req, res) => {
  try {
    const appointment = await _appointmentsModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Actualiza el registro de cita con todos los cambios del cuerpo (body)
    await _appointmentsModel.default.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: "Appointment updated"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//delete appointment by id
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = async (req, res) => {
  try {
    const appointment = await _appointmentsModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    await _appointmentsModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: "Appointment deleted"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//get all appointments by patient id
exports.deleteAppointmentById = deleteAppointmentById;
const getAllAppointmentsByPatientId = async (req, res) => {
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
    const appointments = await _appointmentsModel.default.findAll({
      where: {
        patient_id: req.params.id
      }
    });
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

//get all appointments by doctor id
exports.getAllAppointmentsByPatientId = getAllAppointmentsByPatientId;
const getAllAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctor = await _doctorModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }
    const appointments = await _appointmentsModel.default.findAll({
      where: {
        doctor_id: req.params.id
      }
    });
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getAllAppointmentsByDoctorId = getAllAppointmentsByDoctorId;
const getAppointmentsConfirmed = async (req, res) => {
  try {
    const appointments = await _appointmentsModel.default.findAll({
      where: {
        status: "CONFIRMED"
      }
    });
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getAppointmentsConfirmed = getAppointmentsConfirmed;
const getAppointmentsPending = async (req, res) => {
  try {
    const appointments = await _appointmentsModel.default.findAll({
      where: {
        status: "PENDING"
      }
    });
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getAppointmentsPending = getAppointmentsPending;
const getAppointmentsCancelled = async (req, res) => {
  try {
    const appointments = await _appointmentsModel.default.findAll({
      where: {
        status: "CANCELLED"
      }
    });
    if (!appointments) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.getAppointmentsCancelled = getAppointmentsCancelled;
const updateAppointentConfirmed = async (req, res) => {
  try {
    const appointment = await _appointmentsModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    await _appointmentsModel.default.update({
      status: "CONFIRMED"
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: "Appointment updated"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.updateAppointentConfirmed = updateAppointentConfirmed;
const updateAppointentCancelled = async (req, res) => {
  try {
    const appointment = await _appointmentsModel.default.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    await _appointmentsModel.default.update({
      status: "CANCELLED"
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: "Appointment updated"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
exports.updateAppointentCancelled = updateAppointentCancelled;