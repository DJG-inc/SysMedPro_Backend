import jwt from 'jsonwebtoken';
import Administrator from '../models/userModels/administrator.model.js';
import Doctor from '../models/userModels/doctor.model.js';
import Patient from '../models/userModels/patient.model.js';
import dotenv from 'dotenv';
import { renewToken } from '../utils/jwt.js';

dotenv.config();

const isAdministrator = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const administrator = await Administrator.findOne({ where: { id: decoded.id } });

        if (!administrator) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const isDoctor = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const doctor = await Doctor.findOne({ where: { id: decoded.id } });

        if (!doctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.doctor = doctor;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const isPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.patient = patient;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//verificar si es administrador o doctor

const isAdministratorOrDoctor = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const administrator = await Administrator.findOne({ where: { id: decoded.id } });
        const doctor = await Doctor.findOne({ where: { id: decoded.id } });

        if (!administrator && !doctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        req.doctor = doctor;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//verificar si es administrador o doctor o paciente

const isAdministratorOrDoctorOrPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const administrator = await Administrator.findOne({ where: { id: decoded.id } });
        const doctor = await Doctor.findOne({ where: { id: decoded.id } });
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!administrator && !doctor && !patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        req.doctor = doctor;
        req.patient = patient;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//verificar si es administrador o paciente

const isAdministratorOrPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const administrator = await Administrator.findOne({ where: { id: decoded.id } });
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!administrator && !patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        req.patient = patient;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//verificar si es doctor o paciente

const isDoctorOrPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // El token ha expirado; intenta renovarlo
                const newToken = await renewToken(token);

                if (!newToken) {
                    return res.status(401).json({ error: 'Failed to renew token.' });
                }

                // Actualiza la solicitud con el nuevo token
                req.headers['Authorization'] = `Bearer ${newToken}`;

                // Decodifica el nuevo token
                decoded = jwt.decode(newToken);
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
        }

        const doctor = await Doctor.findOne({ where: { id: decoded.id } });
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!doctor && !patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.doctor = doctor;
        req.patient = patient;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const validateJwt = {
    isAdministrator,
    isDoctor,
    isPatient,
    isAdministratorOrDoctor,
    isAdministratorOrDoctorOrPatient,
    isAdministratorOrPatient,
    isDoctorOrPatient
};
