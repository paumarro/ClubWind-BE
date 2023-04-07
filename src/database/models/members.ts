import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

import Club from '../models/clubs'
import Event from '../models/events'


export const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {                     //update to fk
    type: DataTypes.STRING,
    allowNull: true
  },
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

//Drawing many to many relationships
//This already added the fk ids to the bridge table (Club_Member)
Member.belongsToMany(Club, {
  through: "Club_Member"
});

Club.belongsToMany(Member, {
  through: "Club_Member"
});

Member.belongsToMany(Event, {
  through: "Member_Event",
  as: "events",
  foreignKey: "memberId"
});

Event.belongsToMany(Member, {
  through: "Member_Event",
  as: "members",
  foreignKey: "eventId"
});


Member.sync().then(() => {})

export default Member