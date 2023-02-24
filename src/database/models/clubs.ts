import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  founding_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  nature: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})

Club.sync().then(() => {})

export default Club
