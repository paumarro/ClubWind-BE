import { Sequelize } from 'sequelize'

// instantiate a new Sequelize instance for the main data
export const sequalize = new Sequelize('memberdb', 'root', 'pass', {
  host: 'localhost',
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
