import express from 'express';
import { loginAdmin, registerAdmin, forgotPassword, resetPassword } from '../controllers/admin.controller.js';
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { isAdministrator } from "../middlewares/validateJwt.js";

const router = express.Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginAdmin);

router.get('/renew', isAdministrator, (req, res) => {
    res.json({
        ok: true,
        msg: 'Renew'
    })
})

router.post('/register', [
    check('email', 'Email is required').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], registerAdmin);

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