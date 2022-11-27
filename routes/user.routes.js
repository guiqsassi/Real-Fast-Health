import express from "express";
import User from "../models/User.js";
import verifyToken from "../config/auth.js";

const user = express.Router();

user.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

user.post('/registerUser', async (req, res) => {
    const { name, email, password, admin } = req.body;
    console.log('entrou');
    const alreadyExistsUser = await User.findOne(
        { where: { email } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsUser) {
        console.log("Usuário existente: " + alreadyExistsUser);
        return res
            .status(409)
            .json({ message: "E-mail já utilizado por outro usuário"})
    }

    const newUser = new User({ name, email, password, admin});
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o usuário"});
    });

    if (savedUser) {
        console.log(savedUser);
        res.json({ message: "Obrigado pelo cadastro!" })
    } 


});

user.get('/findUser', async (req, res) => {
    const id = req.query.idUser
    const users = await User.findAll({
        where: { id }
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (users){
        return res.json({users})
    } else {
        return null
    }
})

user.post('/updateUser:id', async (req, res) => {
    const { name, email, password, admin } = req.body;
    const id = req.params.id
    const savedUser = await User.update(
        {name, email, password, admin},
        {
            where:{
                id: id
            },individualHooks: true
        }
    ).catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível alterar o usuário"});
    });

    if (savedUser) {
        console.log(savedUser);
        res.json({ message: "Obrigado pela alteração!" })
    } 

})

user.delete('/deleteUser:id', async (req, res) => {
    const id = req.query.idUser
    const buscaId = await User.findOne({ where: id }).catch((err) => {console.log(err)})
    
    if(buscaId){
        await buscaId.destroy().then(res.json(buscaId)).catch((err) => console.log(err))
    }})

export default user;