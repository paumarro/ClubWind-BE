import { Sequelize } from 'sequelize'
import fs from 'fs';
import path from 'path';

const dbHost = "clubwinddb.mysql.database.azure.com"
const dbName = "clubWinddb"
const dbUser = "cwADMIN"
const dbPass = "ClubWind123"

console.log(dbHost)
console.log(dbName)
console.log(dbUser)
console.log(dbPass)

// CA certificate file provided by Azure
const caCert = fs.readFileSync(path.resolve(__dirname,'./DigiCertGlobalRootCA.crt.pem'));

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
 