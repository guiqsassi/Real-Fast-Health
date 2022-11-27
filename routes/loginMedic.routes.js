import express from "express";
import Medic from "../models/Medic.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const loginMedic = express.Router();

loginMedic.post('/', async (req, res) => {
    // Receber as informações de LOGIN
    const { email, password } = req.body;

    // Buscar EMAIL no Banco de Dados e armazenar
    const registeredMedic = await Medic.findOne(
        { where: { email }}
    ).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!registeredMedic)
        return res
            .status(400)
            .json({message: "Email ou Senha inválidos."})

    // Validar a SENHA do Usuário
    if (!bcrypt.compareSync(password, registeredMedic.password) )
        return res
            .status(400)
            .json({message: "Email ou Senha inválidos."})
    
    // Geração do TOKEN
    const token = jwt.sign(
        // PAYLOAD: o que será armazenado no TOKEN
        {
            id: registeredMedic.id,
            name: registeredMedic.name,
            admin: registeredMedic.admin,
            email: registeredMedic.email,
            crm: registeredMedic.crm,
            cpf: registeredMedic.cpf
        }, 
        // Secret or Private Key
        process.env.JWT_SECRET,
        // Options
        {
            expiresIn: '1h'
        }
    );

    // Envia confirmação e Token para Usuário
    res.json({
        message: "Bem-vindo!",
        token: token
    })


});

export default loginMedic;
