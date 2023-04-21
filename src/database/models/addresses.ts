import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Event from './events';

export const Address = sequalize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    post_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    country: {
        type: DataTypes.STRING,
        allowNull: false
      },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    floor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apartment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    
Address.sync().then(() => {})

export default Address 