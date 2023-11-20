"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMedReport = exports.updateMedHistory = exports.getMedReportById = exports.getMedHistoryById = exports.getAllMedReportByMedHistory = exports.getAllMedHistoryByPatient = exports.getAllMedHistory = exports.deleteMedReport = exports.deleteMedHistory = exports.createMedReport = exports.createMedHistory = void 0;
var _medhistoryModel = require("../../models/featureModels/medhistory.model.js");
//create medhistory con el id del paciente
const createMedHistory = async (req, res) => {
  try {
    //el id del paciente se pasa por la url
    const {
      patient_id
    } = req.params;
    const {
      dor
    } = req.body;
    const newMedHistory = await _medhistoryModel.MedHistory.create({
      dor,
      patient_id
    });
    res.status(200).json(newMedHistory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//crear el reporte con el id de la historia medica
exports.createMedHistory = createMedHistory;
const createMedReport = async (req, res) => {
  try {
    const {
      medhistory_id
    } = req.params;
    const {
      report_details,
      dor
    } = req.body;
    const newMedReport = await _medhistoryModel.MedReport.create({
      report_details,
      dor,
      medhistory_id
    });
    res.status(200).json(newMedReport);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//obtener todas las historias medicas
exports.createMedReport = createMedReport;
const getAllMedHistory = async (req, res) => {
  try {
    const allMedHistory = await _medhistoryModel.MedHistory.findAll();
    res.status(200).json(allMedHistory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//obtener todas las historias medicas de un paciente
exports.getAllMedHistory = getAllMedHistory;
const getAllMedHistoryByPatient = async (req, res) => {
  try {
    const {
      patient_id
    } = req.params;
    const allMedHistory = await _medhistoryModel.MedHistory.findAll({
      where: {
        patient_id
      }
    });
    res.status(200).json(allMedHistory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//obtener todas las historias medicas de un paciente
exports.getAllMedHistoryByPatient = getAllMedHistoryByPatient;
const getAllMedReportByMedHistory = async (req, res) => {
  try {
    const {
      medhistory_id
    } = req.params;
    const allMedReport = await _medhistoryModel.MedReport.findAll({
      where: {
        medhistory_id
      }
    });
    res.status(200).json(allMedReport);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//obtener una historia medica por id
exports.getAllMedReportByMedHistory = getAllMedReportByMedHistory;
const getMedHistoryById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const medHistory = await _medhistoryModel.MedHistory.findOne({
      where: {
        id
      }
    });
    res.status(200).json(medHistory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//obtener un reporte por id
exports.getMedHistoryById = getMedHistoryById;
const getMedReportById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const medReport = await _medhistoryModel.MedReport.findOne({
      where: {
        id
      }
    });
    res.status(200).json(medReport);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//actualizar una historia medica
exports.getMedReportById = getMedReportById;
const updateMedHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      dor
    } = req.body;
    const medHistory = await _medhistoryModel.MedHistory.findOne({
      where: {
        id
      }
    });
    medHistory.dor = dor;
    await medHistory.save();
    res.status(200).json(medHistory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//actualizar un reporte
exports.updateMedHistory = updateMedHistory;
const updateMedReport = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      report_details,
      dor
    } = req.body;
    const medReport = await _medhistoryModel.MedReport.findOne({
      where: {
        id
      }
    });
    medReport.report_details = report_details;
    medReport.dor = dor;
    await medReport.save();
    res.status(200).json(medReport);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//eliminar una historia medica
exports.updateMedReport = updateMedReport;
const deleteMedHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await _medhistoryModel.MedHistory.destroy({
      where: {
        id
      }
    });
    res.status(200).json({
      message: 'MedHistory deleted'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//eliminar un reporte
exports.deleteMedHistory = deleteMedHistory;
const deleteMedReport = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await _medhistoryModel.MedReport.destroy({
      where: {
        id
      }
    });
    res.status(200).json({
      message: 'MedReport deleted'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteMedReport = deleteMedReport;