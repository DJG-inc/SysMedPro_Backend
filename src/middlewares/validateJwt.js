import jwt from 'jsonwebtoken';
import Administrator from '../models/administrator.model.js';
import Doctor from '../models/doctor.model.js';
import Patient from '../models/patient.model.js';
import dotenv from 'dotenv';

dotenv.config();

const isAdministrator = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const administrator = await Administrator.findOne({ where: { id: decoded.id } });

        if (!administrator) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;5
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

const isDoctor = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await Doctor.findOne({ where: { id: decoded.id } });

        if (!doctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.doctor = doctor;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

const isPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.patient = patient;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

const isAdministratorOrDoctor = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const administrator = await Administrator.findOne({ where: { id: decoded.id } });
        const doctor = await Doctor.findOne({ where: { id: decoded.id } });

        if (!administrator && !doctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        req.doctor = doctor;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }
        
        res.status(500).json({ error: 'Internal server error' });
    }
};

const isAdministratorOrDoctorOrPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

const isAdministratorOrPatient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const administrator = await Administrator.findOne({ where: { id: decoded.id } });
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!administrator && !patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.administrator = administrator;
        req.patient = patient;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

const isDoctorOrPatient = async (req, res, next) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await Doctor.findOne({ where: { id: decoded.id } });
        const patient = await Patient.findOne({ where: { id: decoded.id } });

        if (!doctor && !patient) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.doctor = doctor;
        req.patient = patient;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired.' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

export { isAdministrator, isDoctor, isPatient, isAdministratorOrDoctor, isAdministratorOrDoctorOrPatient, isAdministratorOrPatient, isDoctorOrPatient };