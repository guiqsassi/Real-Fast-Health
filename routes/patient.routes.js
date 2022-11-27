import express from "express";
// import ChronicDisease from "../models/ChronicDisease.js";
// import Cirurgy from "../models/Cirurgy.js";
// import Deficiency from "../models/Deficiency.js";
// import Allergy from "../models/Allergy.js";
import verifyToken from "../config/auth.js";
import Patient from "../models/Patient.js";

const patient = express.Router();

patient.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

patient.post('/registerPatient', async (req, res) => {
    const { idUser, name, cpf, rg, altura, peso, telefone, contatoEmergencia, DTNascimento, nomePlanoSaude, numeroCadastro, validadePlanoSaude, cep, numeroResidencia, complemento, estado, cidade, podeReceberSangue, tipoSanguineo, doadorOrgao, fumante, nameChronicDisease, nameAllergy, nameDeficiency, nameCirurgy, rua, bairro } = req.body;

    const alreadyExistsPatient = await Patient.findOne(
        { where: { cpf } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsPatient) {
        console.log("Paciente existente: " + alreadyExistsPatient);
        return res
            .status(409)
            .json({ message: "CPF já utilizado por outro paciente"})
    }

    const newPatient = new Patient({ idUser, name, cpf, rg, altura, peso, telefone, contatoEmergencia, DTNascimento, nomePlanoSaude, numeroCadastro, validadePlanoSaude, cep, rua, numeroResidencia, complemento,  bairro, estado, cidade, podeReceberSangue, tipoSanguineo, doadorOrgao, fumante, nameChronicDisease, nameAllergy, nameDeficiency, nameCirurgy });
    const savedPatient = await newPatient.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o paciente"});
    });

    if (savedPatient) {
        console.log(savedPatient);
        res.json({ message: "Obrigado pelo cadastro!" })
    } 


});

patient.get('/findByUser', async (req, res) => {
    const idUser = req.query.idUser;
    const patients = await Patient.findAll({
        where: {
            idUser: idUser
        },
  
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (patients) {
        return res.json({ patients })
    } else {
        return null
    }
})


patient.get('/findByPatient', async (req, res) => {
    const idPatient = req.query.idPatient;
    console.log(req.query   )
    const patients = await Patient.findAll({
        where: {
            id: idPatient
        },
        include: [{model: Patient }]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (patients) {
        return res.json({ patients })
    } else {
        return null
    }
})

patient.get('/findByPatientM', async (req, res) => {
    const idPatient = req.query.idPatient;
    console.log(req.query   )
    const patients = await Patient.findAll({
        where: {
            id: idPatient
        },

    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (patients) {
        return res.json({ patients })
    } else {
        return null
    }
})

patient.post('/updatePatient:id', async (req, res) => {
    const { name, cpf, rg, altura, peso, telefone, contatoEmergencia, DTNascimento, nomePlanoSaude, numeroCadastro, validadePlanoSaude, cep, rua,numeroResidencia, complemento, bairro, cidade, estado, podeReceberSangue,  tipoSanguineo, doadorOrgao, fumante, nameChronicDisease, nameAllergy, nameDeficiency, nameCirurgy } = req.body;

    const id = req.params.id 
    const savadPatient = await Patient.update(
        { name, cpf, rg, altura, peso, telefone, contatoEmergencia, DTNascimento, nomePlanoSaude, numeroCadastro, validadePlanoSaude, cep, rua,numeroResidencia, complemento, bairro, cidade, estado, podeReceberSangue, tipoSanguineo, doadorOrgao, fumante, nameChronicDisease, nameAllergy, nameDeficiency, nameCirurgy }, 
        {
            where:{
                id: id
            }
        }
    ).catch((err) => {
            console.log("Erro:", err);
            res.status(500).json({ error: "Não foi possível alterar o paciente"})
        });

    if (savadPatient) {
        console.log(savadPatient);
        res.json({ message: "Obrigado pela alteração!" }) 
    }
})

patient.delete('/deletePatient:id', async (req, res) => {
    const id = req.query.idPatient
    const buscaId = await Patient.findOne({ where: id }).catch((err) => {console.log(err)})
    
    if(buscaId){
        await buscaId.destroy().then(res.json(buscaId)).catch((err) => console.log(err))
    }})

export default patient;