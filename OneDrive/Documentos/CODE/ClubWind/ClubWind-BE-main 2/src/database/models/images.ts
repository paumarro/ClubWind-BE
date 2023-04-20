import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Club from './clubs';
import Event from './events';


export const Image = sequalize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: { 
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  description: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

Club.hasMany(Image, {
  sourceKey: "id",
  foreignKey: "clubId",
  as: "images"
});

Image.belongsTo(Club, {
  targetKey: "id",
  foreignKey: "clubId",
  as: "club"  
});

Event.hasMany(Image, {
  sourceKey: "id",
  foreignKey: "eventId",
  as: "images"
});

Image.belongsTo(Event, {
  targetKey: "id",
  foreignKey: "eventId",
  as: "event"  
});



Image.sync().then(() => {})

export default Image
