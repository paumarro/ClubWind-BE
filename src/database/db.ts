import { Sequelize } from 'sequelize'

// instantiate a new Sequelize instance for the main data
export const mainDB = new Sequelize('mainDB', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// instantiate a new Sequelize instance for the user data
export const authDB = new Sequelize({
  dialect:'sqlite',
  storage:'./users.sqlite'
});


// test the connection to the database
export const establishDBConnection = async () => {
  try {
    await mainDB.authenticate()
    console.log('  ------ MySQL Server started ------\n')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
