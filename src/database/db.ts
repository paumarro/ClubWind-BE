import { Sequelize } from 'sequelize'
import fs from 'fs';
import path from 'path';

const dbHost = process.env.DB_HOST || "clubwinddb.mysql.database.azure.com"
const dbName = process.env.DB_NAME || "ClubWindDB"
const dbUser = process.env.DB_USER || "cwADMIN"
const dbPass = process.env.DB_PASSWORD

// Load the CA certificate file provided by Azure
const caCert = fs.readFileSync(path.resolve(__dirname,'./DigiCertGlobalRootCA.crt.pem'));

// Instantiate a new Sequelize instance for the main data
export const sequalize: Sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false, 
  ssl: true,
  dialectOptions: {
    ssl: {
      ca: caCert,
      // Uncomment the following line to enforce SSL
      // rejectUnauthorized: true
    },
  },
});

// Test the connection to the database
export const establishDBConnection = async () => {
  try {
    await sequalize.authenticate();
    console.log('  ------ MySQL Server started ------\n');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
