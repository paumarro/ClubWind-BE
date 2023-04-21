import { DataTypes } from 'sequelize'
import { sequalize } from '../db'

import Club from '../models/clubs'
import Event from '../models/events'
import Image from '../models/images'
import { MemberEvent } from './bridge_models/members_event';
import Address from './addresses'
import { Role } from './roles'



export const Member = sequalize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  gender: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  addressId: {                    
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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
  through: MemberEvent,
  as: "events", 
  foreignKey: "memberId"
});

Event.belongsToMany(Member, {
  through: MemberEvent, 
  as: "members",
  foreignKey: "eventId"
});

Member.hasOne(Image, {
  sourceKey: "id",
  foreignKey: "memberId"
});

Image.belongsTo(Member, {
  targetKey: "id",
  foreignKey: "memberId",
  as: "member"  
});

Address.hasMany(Member, {
  sourceKey: "id",
  foreignKey: "addressId",
  as: "members"
})

Member.belongsTo(Address, {
  targetKey: "id",
  foreignKey: "addressId"
})

Role.hasMany(Member, {
  sourceKey: "id",
  foreignKey: "roleId",
  as: "members"
})

Member.belongsTo(Role, {
  targetKey: "id",
  foreignKey: "roleId"
})

Member.sync().then(() => {})

export default Member