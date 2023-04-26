import { Sequelize } from 'sequelize'

// instantiate a new Sequelize instance for the main data
export const sequalize: Sequelize = new Sequelize('ClubWindDB', 'root', 'pass', {
  host: 'db',
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