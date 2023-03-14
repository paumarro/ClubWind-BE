import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import Event from './events';

export const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    post_code: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    country: {
        type: DataTypes.STRING,
        allowNull: true
      },
    street_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    apartment: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    description: {
        type: DataTypes.STRING,
        allowNull: true
      },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    });


Address.belongsTo(Event, {
    targetKey: "id",
    foreignKey: "eventId",
    as: "event"
})

    
Address.sync().then(() => {})

export default Address