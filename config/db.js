import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Load Config
dotenv.config({ path: './config/config.env' });

const connection = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST
  }
);

export default connection;