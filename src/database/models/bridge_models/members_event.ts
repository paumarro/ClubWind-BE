import { DataTypes } from 'sequelize'
import { sequelize } from '../../db'


export const MemberEvent = sequelize.define('MemberEvent', {
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

MemberEvent.sync().then(() => {})
