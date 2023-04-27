import { Sequelize } from 'sequelize'
import fs from 'fs';
import path from 'path';

const dbHost = "clubwinddb.mysql.database.azure.com"
const dbName = "clubWinddb"
const dbUser = "cwADMIN"
const dbPass = "ClubWind123"

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

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
 