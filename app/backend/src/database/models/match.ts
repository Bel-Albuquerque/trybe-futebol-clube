import { Model } from 'sequelize';
import { DataTypes } from 'sequelize/types';
import db from '.';
import Clubs from './club';

export default class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: { type: DataTypes.INTEGER, allowNull: false },
  homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  awayTeam: { type: DataTypes.INTEGER, allowNull: false },
  awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  inProgress: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'match',
});

Match.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });
