import express from 'express';
import db from '../dataBase/initDb.js';
import cors from 'cors';
import errorHandler from '../middlewares/error.handler.js';
import doctorRoutes from '../routes/doctor.routes.js';
import patientRoutes from '../routes/patient.routes.js';
import appointmenRoutes from '../routes/appointments.routes.js';
import medicalRHistoryRoutes from '../routes/medicalhistory.routes.js';
import adminRoutes from '../routes/admin.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
            await db.sync();
            console.log("All models were synchronized successfully.");
        } catch (error) {
            throw new Error(error);
        }
    }
    middlewares() {
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(errorHandler);
    }
    routes() {
        this.app.use('/api/patient', patientRoutes);
        this.app.use('/api/appointment', appointmenRoutes);
        this.app.use('/api/doctor', doctorRoutes);
        this.app.use('/api/medicalhistory', medicalRHistoryRoutes);
        this.app.use('/api/admin', adminRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        });
    }
}

export default Server;