import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Club from './clubs';


export const Image = sequalize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ceated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});


Image.sync().then(() => {})

export default Image
