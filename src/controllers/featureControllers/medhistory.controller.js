import { MedHistory } from "../../models/featureModels/medhistory.model.js";
import { MedReport } from "../../models/featureModels/medhistory.model.js";

//create medhistory con el id del paciente
export const createMedHistory = async (req, res) => {
  try {
    //el id del paciente se pasa por la url
    const { patient_id } = req.params;
    const { dor } = req.body;
    const newMedHistory = await MedHistory.create({
      dor,
      patient_id,
    });
    res.status(200).json(newMedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//crear el reporte con el id de la historia medica
export const createMedReport = async (req, res) => {
  try {
    const { medhistory_id } = req.params;
    const { report_details, dor } = req.body;
    const newMedReport = await MedReport.create({
      report_details,
      dor,
      medhistory_id,
    });
    res.status(200).json(newMedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//obtener todas las historias medicas
export const getAllMedHistory = async (req, res) => {
  try {
    const allMedHistory = await MedHistory.findAll();
    res.status(200).json(allMedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//obtener todas las historias medicas de un paciente
export const getAllMedHistoryByPatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const allMedHistory = await MedHistory.findAll({
      where: {
        patient_id,
      },
    });
    res.status(200).json(allMedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//obtener todas las historias medicas de un paciente
export const getAllMedReportByMedHistory = async (req, res) => {
  try {
    const { medhistory_id } = req.params;
    const allMedReport = await MedReport.findAll({
      where: {
        medhistory_id,
      },
    });
    res.status(200).json(allMedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//obtener una historia medica por id
export const getMedHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const medHistory = await MedHistory.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(medHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//obtener un reporte por id
export const getMedReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const medReport = await MedReport.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(medReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//actualizar una historia medica
export const updateMedHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { dor } = req.body;
    const medHistory = await MedHistory.findOne({
      where: {
        id,
      },
    });
    medHistory.dor = dor;
    await medHistory.save();
    res.status(200).json(medHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//actualizar un reporte
export const updateMedReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { report_details, dor } = req.body;
    const medReport = await MedReport.findOne({
      where: {
        id,
      },
    });
    medReport.report_details = report_details;
    medReport.dor = dor;
    await medReport.save();
    res.status(200).json(medReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//eliminar una historia medica
export const deleteMedHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await MedHistory.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'MedHistory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//eliminar un reporte
export const deleteMedReport = async (req, res) => {
  try {
    const { id } = req.params;
    await MedReport.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'MedReport deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



