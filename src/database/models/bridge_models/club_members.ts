import { DataTypes } from 'sequelize'
import { sequelize } from '../../db'


 const Club_Member = sequelize.define('Club_Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

Club_Member.sync().then(() => {})
