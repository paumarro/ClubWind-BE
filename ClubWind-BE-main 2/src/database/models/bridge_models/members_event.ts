import { DataTypes } from 'sequelize'
import { mainDB } from '../../db'


export const MemberEvent = mainDB.define('MemberEvent', {
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
