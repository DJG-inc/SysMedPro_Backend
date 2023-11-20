import express from "express";
import { registerDoctor, loginDoctor, getDoctorById, getDoctors, forgotPassword, resetPassword, updateDoctor } from "../../controllers/userControllers/doctor.controller.js";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { validateJwt } from "../../middlewares/validateJwt.js";

const router = express.Router();

router.post( "/register", [
    check("first_name", "First Name is required").not().isEmpty(),
    check("last_name", "Last Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("speciality", "Speciality is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("office_room", "Office Room is required").not().isEmpty(),
    validateFields,
  ], validateJwt.isAdministrator, registerDoctor); // Register Doctor

router.post( "/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
], loginDoctor); // Login Doctor

router.get( "/all", validateJwt.isAdministratorOrDoctorOrPatient, getDoctors); // Get Doctors
  
router.get( "/:id", validateJwt.isAdministratorOrDoctorOrPatient, getDoctorById); // Get Doctor by ID


router.post('/forgot-password', [
  check('email', 'Email is required').isEmail(),
  validateFields
], forgotPassword);

router.post('/reset-password/:resetToken', [
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validateFields
], resetPassword);

router.put('update/:id', validateJwt.isAdministratorOrDoctor, updateDoctor); // Update Doctor

export default router;
