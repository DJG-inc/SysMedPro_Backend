import Administrator from "../../models/userModels/administrator.model.js";
import { createJwt } from "../../utils/jwt.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize"
import crypto from "crypto";
import { sendMail } from "../../utils/nodemailer.js";

export const loginAdmin = async (req, res) => {
    try{
        const admin = await Administrator.findOne({email:req.body.email});
        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }

        const isMatch = bcrypt.compareSync(req.body.password, admin.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = createJwt(admin.id);
        return res.status(200).json({admin, token, message:"Login successful"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
};

export const registerAdmin = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const admin = await Administrator.findOne({email:req.body.email});
        if(admin){
            return res.status(400).json({message:"Admin already exists"});
        }

        const newAdmin = await Administrator.create({
            email:req.body.email,
            username:req.body.username,
            password:hashedPassword,
        });

        if(!newAdmin){
            return res.status(400).json({message:"Admin could not be created"});
        }

        return res.status(200).json({message:"Admin created successfully", newAdmin});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
};

export const forgotPassword = async (req, res) => {
    try{
        const admin = await Administrator.findOne({where:{email:req.body.email}});
        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }

        //generar token de reseteo de contraseña
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        //guardar el token en la base de datos
        await Administrator.update({
            resetPasswordToken,
            resetPasswordExpire: Date.now() + 10 * (60 * 1000),
        }, {where:{id:admin.id}});

        //enviar email con el token
        await sendMail({
            to:admin.email,
            subject:"Reset your password for SysMedPro",
            html: `<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Reset your password for SysMedPro</h1><p style="text-align:center;">You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p><p style="text-align:center;">Please click on the following link, or paste this into your browser to complete the process within 10 minutes of receiving it:</p><p style="text-align:center;">http://localhost:3000/resetpassword/${resetToken}</p><p style="text-align:center;">If you did not request this, please ignore this email and your password will remain unchanged.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
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
        const admin = await Administrator.findOne({
            where: {
                resetPasswordToken: crypto.createHash("sha256").update(req.params.resetToken).digest("hex"),
                resetPasswordExpire: {
                    [Op.gt]: Date.now(),
                },
            },
        });
        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }
        //si el token expiro o no existe enviar error
        if(!admin.resetPasswordToken || !admin.resetPasswordExpire){
            return res.status(400).json({message:"Invalid token"});
        }

        //actualizar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await Administrator.update({
            password:hash,
            resetPasswordToken:null,
            resetPasswordExpire:null,
        }, {where:{id:admin.id}});

        //enviar email de confirmacion 
        await sendMail({
            to:admin.email,
            subject:"Your password has been changed",
            html:`<img src="https://www.logomoose.com/wp-content/uploads/2016/05/medic.jpg" alt="logo" border="0" width="400" height="200" style="display:block;margin-left:auto;margin-right:auto;"/><h1 style="text-align:center;">Your password has been changed</h1><p style="text-align:center;">This is a confirmation that the password for your account ${admin.email} has just been changed.</p><p style="text-align:center;">Best regards,</p><p style="text-align:center;">SysMedPro team</p>`
        });

        return res.status(200).json({message:"Password updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

