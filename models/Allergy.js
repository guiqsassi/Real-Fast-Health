import sequelize from 'sequelize';
import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Allergy = connection.define(
    'allergy',
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
        nameAllergy: {
            type: Sequelize.STRING,
            allowNull: true
        }

    }

)

export default Allergy;