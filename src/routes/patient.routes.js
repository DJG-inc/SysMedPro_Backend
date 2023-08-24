import express from 'express';
import { registerPatient, loginPatient, confirmPatient, getPatientById, getPatients, patientRejection, forgotPassword, resetPassword } from '../controllers/patient.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { isAdministrator, isDoctor, isPatient, isAdministratorOrDoctor, isAdministratorOrDoctorOrPatient, isAdministratorOrPatient, isDoctorOrPatient } from "../middlewares/validateJwt.js";

const router = express.Router();

router.post('/register', [
    check('email', 'Email is required').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
], registerPatient);

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginPatient);

router.post('/confirm/:id', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    validateFields
], isPatient, confirmPatient);

router.get('/:id', isAdministratorOrDoctor, getPatientById);

router.get('/', isAdministratorOrDoctor, getPatients);

router.put('/reject/:id', isAdministrator, patientRejection);

router.post('/forgot-password', [
    check('email', 'Email is required').isEmail(),
    validateFields
], forgotPassword);

router.post('/reset-password/:resetToken', [
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
], resetPassword);

export default router;

