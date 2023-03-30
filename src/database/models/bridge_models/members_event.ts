import { DataTypes } from 'sequelize'
import { sequelize } from '../../db'


export const Member_Event = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

Member_Event.sync().then(() => {})

export default Member_Event