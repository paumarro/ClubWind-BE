import { DataTypes } from 'sequelize'
import { sequelize } from '../../db'


export const Member_Event = sequelize.define('Member_Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

Member_Event.sync().then(() => {})
