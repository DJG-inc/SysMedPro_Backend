import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointments.model.js";

//create appointment con el id del doctor y el id del paciente
export const createAppointment = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { id: req.params.id } });
        if (!patient) {
            return res.status(401).json({ message: "Patient not found" });
        }
        //buscar el doctor por el id mandado en el body
        const doctor = await Doctor.findOne({
            where: { id: req.body.doctor_id },
        });
        if (!doctor) {
            return res.status(402).json({ message: "Doctor not found" });
        }
        //vificar que la fecha de la cita no sea menor a la fecha actual
        const date = new Date(req.body.date);
        const currentDate = new Date();
        if (date < currentDate) {
            return res
                .status(403)
                .json({ message: "Date cannot be in the past" });
        }
        //verificar que el doctor no tenga una cita en la misma fecha
        const verifyappointment = await Appointment.findOne({
            where: { date: req.body.date, doctor_id: req.body.doctor_id },
        });
        if (verifyappointment) {
            return res
                .status(404)
                .json({ message: "Doctor already has an appointment" });
        }
        //crear la cita con los datos mandados en el body
        const appointment = await Appointment.create({
            date: req.body.date,
            reasonForVisit: req.body.reasonForVisit,
            status: req.body.status,
            patient_id: req.params.id,
            doctor_id: req.body.doctor_id,
        });
        return res.status(200).json({ appointment });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//get appointment by id
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ appointment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        if (!appointments) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//update appointment by id
export const updateAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        await Appointment.update(
            {
                date: req.body.date,
                reasonForVisit: req.body.reasonForVisit,
                status: req.body.status,
                patient_id: req.body.patient_id,    
                doctor_id: req.body.doctor_id,
            },
            { where: { id: req.params.id } }
        );
        return res.status(200).json({ message: "Appointment updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//delete appointment by id
export const deleteAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        await Appointment.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//get all appointments by patient id
export const getAllAppointmentsByPatientId = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { id: req.params.id },
        });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const appointments = await Appointment.findAll({
            where: { patient_id: req.params.id },
        });
        if (!appointments) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//get all appointments by doctor id
export const getAllAppointmentsByDoctorId = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({
            where: { id: req.params.id },
        });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const appointments = await Appointment.findAll({
            where: { doctor_id: req.params.id },
        });
        if (!appointments) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
