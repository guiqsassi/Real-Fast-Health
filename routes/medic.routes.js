import express from "express";
import Medic from "../models/Medic.js";
import verifyToken from "../config/auth.js";

const medic = express.Router();

medic.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

medic.post('/registerMedic', async (req, res) => {
    const { name, email, password, admin, cpf, crm } = req.body;

    const alreadyExistsMedic = await Medic.findOne(
        { where: { email } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsMedic) {
        console.log("Médico existente: " + alreadyExistsMedic);
        return res
            .status(409)
            .json({ message: "E-mail já utilizado por outro médico"})
    }

    const newMedic = new Medic({ name, email, password, admin, cpf, crm });
    const savedMedic = await newMedic.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o médico"});
    });

    if (savedMedic) {
        console.log(savedMedic);
        res.json({ message: "Obrigado pelo cadastro!" })
    } 


});

medic.get('/findMedic', async (req, res) => {
    const idMedic = req.query.idMedic;
    const medic = await Medic.findAll({
        where: {
            id: idMedic
        }
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (medic){
        return res.json({medic})
    } else {
        return null
    }
})

medic.post('/updateMedic/:id', async (req, res) => {
    const { name, email, password, admin, cpf, crm } = req.body;
    const id = req.params.id
    const savedMedic = await Medic.update(
        { name, email, password, admin, cpf, crm },
        {
            where:{
                id: id
            },individualHooks: true
        }
    ).catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível alterar o médico"});
    });

    if (savedMedic) {
        console.log(savedMedic);
        res.json({ message: "Obrigado pela alteração!" })
    } 
})

medic.delete('/deleteMedic:id', async (req, res) => {
    const id = req.query.idMedic;
    const buscaId = await Medic.findOne({
        where: id
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (buscaId) {
        await buscaId.destroy()
            .then(res.json(buscaId))
            .catch((error) => console.log(error))
    }
})


export default medic;