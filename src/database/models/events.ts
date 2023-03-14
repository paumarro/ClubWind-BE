import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import Address from './addresses';
import Club from './clubs';

const Event = sequelize.define('Event', {
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
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  start_at: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_at: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  entry_fee: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  viewers_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: true
  } 
});

//Drawing a one-to-many relationship from Club to Event 
Event.belongsTo(Club, {
  targetKey: "id",
  foreignKey: "clubId",
  as: "club"
});

Event.hasOne(Address, {
  sourceKey: "id",
  foreignKey: "eventId",
  as: "event"
});

Event.sync().then(() => {})

export default Event