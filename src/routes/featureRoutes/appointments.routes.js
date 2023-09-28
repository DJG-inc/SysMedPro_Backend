import express from 'express';
import { createAppointment, getAppointmentById, getAllAppointments, updateAppointmentById, deleteAppointmentById, getAllAppointmentsByPatientId, getAllAppointmentsByDoctorId, getAppointmentsConfirmed, getAppointmentsPending, getAppointmentsCancelled, updateAppointentConfirmed, updateAppointentCancelled } from '../../controllers/featureControllers/appointment.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../../middlewares/validateFields.js';

const router = express.Router();

router.post('/create/:id', createAppointment);
router.get('/:id', getAppointmentById);
router.get('/all', getAllAppointments);
router.put('/:id', updateAppointmentById);
router.delete('/:id', deleteAppointmentById);
router.get('/patient/:id', getAllAppointmentsByPatientId);
router.get('/doctor/:id', getAllAppointmentsByDoctorId);
router.get('/confirmed/:id', getAppointmentsConfirmed);
router.get('/pending/:id', getAppointmentsPending);
router.get('/cancelled/:id', getAppointmentsCancelled);
router.put('/confirmed/:id', updateAppointentConfirmed);
router.put('/cancelled/:id', updateAppointentCancelled);

export default router;