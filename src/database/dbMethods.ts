const { Sequelize } = require('sequelize')

export const sequelize = new Sequelize('memberdb', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
})

export const startDB = () => {
  try {
    sequelize.authenticate().then(console.log('Connection has been established successfully.')
    )
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  } 
}