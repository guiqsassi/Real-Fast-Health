import express from "express";
import Exam from "../models/Exam.js";
import Patient from "../models/Patient.js";
import verifyToken from "../config/auth.js";

const exam = express.Router();

exam.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

exam.post('/registerExam', async (req, res) => {
    const { idPatient, nameMedic, dateExam, description, title } = req.body;

    const newExam = new Exam({ idPatient, nameMedic, dateExam, description, title });
    const savedExam = await newExam.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o exame"});
    });

    if (savedExam) {
        console.log(savedExam);
        res.json({ message: "Exame cadastrado!" })
    } 


});

exam.get('/findExam', async (req, res) => {
    const idPatient = req.query.idPatient;
    const exams = await Exam.findAll({
        where: {
            idPatient: idPatient
        },
        include: [{model: Patient}]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (exams) {
        return res.json({ exams })
    } else {
        return null
    }
});

exam.delete('/deleteExam:id', async (req, res) => {
    const idExam = req.query.idExam;
    const buscaId = await Exam.findOne({
        where: idExam
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



 

export default exam;