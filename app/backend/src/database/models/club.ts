import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});
