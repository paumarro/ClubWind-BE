import { Sequelize } from 'sequelize'

// instantiate a new Sequelize instance
export const sequelize = new Sequelize('memberdb', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

// test the connection to the database
// look up promises
export const establishDBConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('  ------ MySQL Server started ------\n')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
