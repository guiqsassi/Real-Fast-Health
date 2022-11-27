import sequelize from 'sequelize';
import Sequelize from 'sequelize';
import connection from '../config/db.js';

const ChronicDisease = connection.define(
    'chronicDisease',
    {

        id: {
            type: Sequelize.INTEGER,
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
        nameChronicDisease: {
            type: Sequelize.STRING,
            allowNull: true
        }

    }

)

export default ChronicDisease;