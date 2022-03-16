import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class club extends Model {
  public id: { type: DataTypes.IntegerDataType, primaryKey: true, autoIncrement: true },
  public club_name: DataTypes.StringDataType

};
club.init({
  id: DataTypes.NUMBER,
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'club',
  timestamps: false,
});
