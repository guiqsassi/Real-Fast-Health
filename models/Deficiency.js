import sequelize from 'sequelize';
import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Deficiency = connection.define(
    'deficiency',
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
        nameDeficiency: {
            type: Sequelize.STRING,
            allowNull: true
        }

    }

)

export default Deficiency;