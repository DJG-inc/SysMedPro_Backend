import express from 'express';
import db from '../../database/initDb.js';
import cors from 'cors';
import errorHandler from '../../middlewares/error.handler.js';
import doctorRoutes from '../../routes/userRoutes/doctor.routes.js';
import patientRoutes from '../../routes/userRoutes/patient.routes.js';
import appointmenRoutes from '../../routes/featureRoutes/appointments.routes.js';
import medicalRHistoryRoutes from '../../routes/featureRoutes/medicalHistory.routes.js';
import adminRoutes from '../../routes/userRoutes/admin.routes.js';

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
        this.app.use(`/api/${process.env.API_VERSION}/patients`, patientRoutes);
        this.app.use(`/api/${process.env.API_VERSION}/appointments`, appointmenRoutes);
        this.app.use(`/api/${process.env.API_VERSION}/doctors`, doctorRoutes);
        this.app.use(`/api/${process.env.API_VERSION}/medicalhistory`, medicalRHistoryRoutes);
        this.app.use(`/api/${process.env.API_VERSION}/admin`, adminRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        });
    }
}

export default Server;