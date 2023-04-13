import { DataTypes } from 'sequelize'
import { mainDB } from '../../db'


 const Club_Member = mainDB.define('Club_Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

Club_Member.sync().then(() => {})
