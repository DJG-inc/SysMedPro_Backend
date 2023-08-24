import express from 'express';
import { createMedHistory, createMedReport } from '../controllers/medhistory.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { isAdministrator, isDoctor, isPatient, isAdministratorOrDoctor, isAdministratorOrDoctorOrPatient, isAdministratorOrPatient, isDoctorOrPatient } from "../middlewares/validateJwt.js";

const router = express.Router();

router.post('/create/:patient_id', [
    check('dor', 'Date of report is required').not().isEmpty(),
    validateFields,
], isDoctor, createMedHistory);

router.post('/create/report/:medhistory_id', [
    check('report_details', 'Report details is required').not().isEmpty(),
    check('dor', 'Date of report is required').not().isEmpty(),
    validateFields,
], isDoctor, createMedReport);

export default router;