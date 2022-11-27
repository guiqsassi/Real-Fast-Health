import sequelize from 'sequelize';
import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Cirurgy = connection.define(
    'cirurgy',
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
        nameCirurgy: {
            type: Sequelize.STRING,
            allowNull: true
        }

    }

)

export default Cirurgy;