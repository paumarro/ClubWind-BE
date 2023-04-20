import { DataTypes } from 'sequelize'
import { sequalize } from '../db'


export const Role = sequalize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });


Role.sync().then(() => {}) 
