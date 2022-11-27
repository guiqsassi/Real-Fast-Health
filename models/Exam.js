
import Sequelize from 'sequelize';
import connection from '../config/db.js';
import Patient from './Patient.js';

const Exam = connection.define(
    'exam',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true            
        },
        idPatient: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            }
        },
        nameMedic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateExam: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,   
        },
    }

)

Exam.belongsTo(Patient, {
    foreignKey: 'idPatient'
  });

export default Exam;