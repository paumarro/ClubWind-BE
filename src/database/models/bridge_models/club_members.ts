import { DataTypes } from 'sequelize'
import { sequelize } from '../../db'


export const Club_Member = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

Club_Member.sync().then(() => {})

export default Club_Member