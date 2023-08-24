import express from 'express';
import { createAppointment, getAppointmentById, getAllAppointments, updateAppointmentById, deleteAppointmentById, getAllAppointmentsByPatientId, getAllAppointmentsByDoctorId } from '../controllers/appointment.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/create/:id', createAppointment);
router.get('/:id', getAppointmentById);
router.get('/', getAllAppointments);
router.put('/:id', updateAppointmentById);
router.delete('/:id', deleteAppointmentById);
router.get('/patient/:id', getAllAppointmentsByPatientId);
router.get('/doctor/:id', getAllAppointmentsByDoctorId);

export default router;