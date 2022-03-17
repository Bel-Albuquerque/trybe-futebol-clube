import { Model } from 'sequelize';
import { DataTypes } from 'sequelize/types';
import db from '.';
import Clubs from './club';

export default class Match extends Model {
  public id: number;

  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: number;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  home_team: { type: DataTypes.INTEGER, allowNull: false },
  home_team_goals: { type: DataTypes.INTEGER, allowNull: false },
  away_team: { type: DataTypes.INTEGER, allowNull: false },
  away_team_goals: { type: DataTypes.INTEGER, allowNull: false },
  in_progress: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'match',
});

Match.belongsTo(Clubs, { foreignKey: 'home_team', as: 'id' });
Match.belongsTo(Clubs, { foreignKey: 'away_team', as: 'id' });
