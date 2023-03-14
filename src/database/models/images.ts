import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import Club from './clubs';


export const Image = sequelize.define('Image', {
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

Image.belongsTo(Club, {
    targetKey: "id",
    foreignKey: "clubId",
    as: "club"  
  });

Image.sync().then(() => {})

export default Image
