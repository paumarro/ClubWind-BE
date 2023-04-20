import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Event from './events'
import Image from './images';

export const Club = sequalize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});




Club.sync().then(() => {})

export default Club