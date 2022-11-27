import Sequelize from 'sequelize';
import connection from '../config/db.js';
import User from './User.js'
const Patient = connection.define(

    'patient',
    {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        idUser: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          }
      },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf: {
      
          type: Sequelize.STRING,
          allowNull: false
          
        },
        rg: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        altura: {
  
          type: Sequelize.INTEGER,
          allowNull: false
  
        },
        peso:{
  
          type: Sequelize.INTEGER,
          allowNull: false
          
        },
        telefone: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        contatoEmergencia: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        DTNascimento: {
  
          type: Sequelize.STRING,
          allowNull: true
  
        },

        nomePlanoSaude: {
  
          type: Sequelize.STRING,
          allowNull: true
          
        },
        numeroCadastro:{
  
          type: Sequelize.STRING,
          allowNull: true
  
        },
        validadePlanoSaude: {
  
          type: Sequelize.STRING,
          allowNull: true
  
        },
  
        cep: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        rua: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        numeroResidencia: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        complemento: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        bairro: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        cidade: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        estado: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
  
        podeReceberSangue: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        tipoSanguineo: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        doadorOrgao: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        fumante: {
  
          type: Sequelize.STRING,
          allowNull: false
  
        },
        nameAllergy: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nameChronicDisease: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nameCirurgy: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nameDeficiency: {
          type: Sequelize.STRING,
          allowNull: true
        }
    }
  );

  Patient.belongsTo(User, {
    foreignKey: 'idUser'
  });

  export default Patient