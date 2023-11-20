import Patient from "../../models/userModels/patient.model.js";
import Appointment from "../../models/featureModels/appointments.model.js";
import { MedHistory, MedReport } from "../../models/featureModels/medhistory.model.js";
import { Op } from "sequelize";
import crypto from "crypto";
import { sendMail } from "../../utils/nodemailer.js";
import { createJwt } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

export const registerPatient = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //verify if patient already exists
        const patient = await Patient.findOne({where:{email:req.body.email}});
        if(patient){
            return res.status(409).json({message:"Patient already exists"});
        }

        //create patient
        const newPatient = await Patient.create({
            email:req.body.email,
            username:req.body.username,
            password:hash
        });

        if(!newPatient){
            return res.status(400).json({message:"Patient could not be created"});
        }

        //enviar email de bienvenida
        await sendMail({
            to:newPatient.email,
            subject:`Welcome ${newPatient.username} to SysMedPro`,
            html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Welcome ${newPatient.username} to SysMedPro</h1><p style="text-align:center;">We are glad to have you here and we hope you enjoy our services and help us improve them in the future.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`,
        });

        return res.status(200).json({message:"Patient created successfully", newPatient});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const loginPatient = async (req, res) => {
    try{
        const patient = await Patient.findOne({where:{email:req.body.email}});
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }

        const isMatch = bcrypt.compareSync(req.body.password, patient.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = createJwt(patient.id);
        return res.status(200).json({patient, token, message:"Patient logged in successfully"});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}

//llena los campos que estan null del paciente
export const confirmPatient = async (req, res) => {
    try{
        //por el id del paciente, buscar en la tabla de pacientes
        const patient = await Patient.findOne({where:{id:req.params.id}});
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }

        const updatedPatient = await Patient.update({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            phone:req.body.phone,
            dob:req.body.dob,
            gender:req.body.gender,
            address:req.body.address,
            status:"CONFIRMED",
        }, {where:{id:req.params.id}});

        if(!updatedPatient){
            return res.status(400).json({message:"Patient could not be updated"});
        }

        return res.status(200).json({message:"Patient updated successfully", updatedPatient});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const patientRejection = async (req, res) => {
    try{
        const patient = await Patient.findOne({where:{id:req.params.id}});
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }

        const updatedPatient = await Patient.update({
            status:"rejected",
        }, {where:{id:req.params.id}});
        if(!updatedPatient){
            return res.status(400).json({message:"Patient could not be updated"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const getPatientById = async (req, res) => {
    try{
        const patient = await Patient.findOne({
            where: { id: req.params.id },
            //incluir los datos de la tabla de citas y de la tabla de historial medico
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
                {
                    model: MedHistory,
                    as: "medhistory",
                    include: [
                        {
                            model: MedReport,
                            as: "medreports",
                        },
                    ],
                },
            ],
        });
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }

        return res.status(200).json({patient});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const getPatients = async (req, res) => {
    try{
        const patients = await Patient.findAll({
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
                {
                    model: MedHistory,
                    as: "medhistory",
                    include: [
                        {
                            model: MedReport,
                            as: "medreports",
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({patients});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const forgotPassword = async (req, res) => {
    try{
        const patient = await Patient.findOne({where:{email:req.body.email}});
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }

        //generar token de reseteo de contraseña
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        //guardar el token en la base de datos
        await Patient.update({
            resetPasswordToken,
            resetPasswordExpire: Date.now() + 10 * (60 * 1000),
        }, {where:{id:patient.id}});

        //enviar email con el token
        await sendMail({
            to:patient.email,
            subject:"Reset your password for SysMedPro",
            html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Reset your password for SysMedPro</h1><p style="text-align:center;">Please click the link below to reset your password.</p><a href="https://sysmedpro.netlify.app/resetpassword/${resetToken}" style="display:block;margin-left:auto;margin-right:auto;text-align:center;">Reset password</a><p style="text-align:center;">If you did not request a password reset, please ignore this email.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`,
        });

        return res.status(200).json({message:"Email sent"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const resetPassword = async (req, res) => {
    try{
        //buscar el paciente por el token
        const patient = await Patient.findOne({
            where: {
                resetPasswordToken: crypto.createHash("sha256").update(req.params.resetToken).digest("hex"),
                resetPasswordExpire: {
                    [Op.gt]: Date.now(),
                },
            },
        });
        if(!patient){
            return res.status(404).json({message:"Patient not found"});
        }
        //si el token expiro o no existe enviar error
        if(!patient.resetPasswordToken || !patient.resetPasswordExpire){
            return res.status(400).json({message:"Invalid token"});
        }

        //actualizar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await Patient.update({
            password:hash,
            resetPasswordToken:null,
            resetPasswordExpire:null,
        }, {where:{id:patient.id}});

        //enviar email de confirmacion
        await sendMail({
            to:patient.email,
            subject:"Your password has been changed",
            html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Your password has been changed</h1><p style="text-align:center;">This is a confirmation that the password for your account ${patient.email} has just been changed.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`,
        });

        return res.status(200).json({message:"Password updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

//---------------------------------------------------------------------------------------------//

export const filterPatientsForStatusConfirmed = async (req, res) => {
    try{
        const patients = await Patient.findAll({where:{status:"CONFIRMED"},
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
                {
                    model: MedHistory,
                    as: "medhistory",
                    include: [
                        {
                            model: MedReport,
                            as: "medreports",
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({patients});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const filterPatientsForStatusPending = async (req, res) => {
    try{
        const patients = await Patient.findAll({where:{status:"PENDING"},
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
                {
                    model: MedHistory,
                    as: "medhistory",
                    include: [
                        {
                            model: MedReport,
                            as: "medreports",
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({patients});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

//filtar pacientes con monticulos // CONROLADOR DE PRUEBA

import { addToHeap, getPatientsByPriority } from "../../utils/heap.js";

const addPatientToHeap = (patient) => {
    addToHeap(patient);
}

const getPatientsByPriorityFromHeap = () => {
    return getPatientsByPriority();
};

export const filterPatientsForStatusConfirmedWithPriority = async (req, res) => {
    try{
        const patients = await Patient.findAll({where:{status:"CONFIRMED"},
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
                {
                    model: MedHistory,
                    as: "medhistory",
                    include: [
                        {
                            model: MedReport,
                            as: "medreports",
                        },
                    ],
                },
            ],
        });
        patients.forEach(patient => {
            addPatientToHeap(patient);
        });
        const patientsByPriority = getPatientsByPriorityFromHeap();
        return res.status(200).json({patientsByPriority});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

//updated patient

export const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { id: req.params.id },
        });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const updatedPatient = await Patient.update(req.body, {
            where: { id: req.params.id },
        });
        if(!updatedPatient){
            return res.status(400).json({message:"Patient could not be updated"});
        }

        return res.status(200).json({message:"Patient updated successfully", updatedPatient});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
};
