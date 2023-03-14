import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import Event from './events'
import Image from './images';

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
  ceated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

//Drawing a one-to-many relationship from Club to Event 
Club.hasMany(Event, {
  sourceKey: "id",
  foreignKey: "clubId",
  as: "events",
});

Club.hasMany(Image, {
  sourceKey: "id",
  foreignKey: "clubId",
  as: "club"
});

Club.sync().then(() => {})

export default Club
