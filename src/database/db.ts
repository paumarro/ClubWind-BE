import { Sequelize } from 'sequelize'

const dbHost= "clubwinddb.mysql.database.azure.com"
const dbName = "ClubWindDB"
const dbUser = "cwADMIN"
const dbPass = "ClubWind123"


// instantiate a new Sequelize instance for the main data
export const sequalize: Sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  logging: false
});


// test the connection to the database
export const establishDBConnection = async () => {
  try {
    await sequalize.authenticate()
    console.log('  ------ MySQL Server started ------\n')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}