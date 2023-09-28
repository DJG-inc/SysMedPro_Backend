import express from 'express';
import { createMedHistory, createMedReport } from '../../controllers/featureControllers/medhistory.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validateFields.js';
import { validateJwt } from '../../middlewares/validateJwt.js';

const router = express.Router();

router.post('/create/:patient_id', [
    check('dor', 'Date of report is required').not().isEmpty(),
    validateFields,
], validateJwt.isDoctor, createMedHistory);

router.post('/create/report/:medhistory_id', [
    check('report_details', 'Report details is required').not().isEmpty(),
    check('dor', 'Date of report is required').not().isEmpty(),
    validateFields,
], validateJwt.isDoctor, createMedReport);

export default router;