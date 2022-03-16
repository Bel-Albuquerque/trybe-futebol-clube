'use strict';

import { Model } from 'sequelize';
import db from '.';
import { DataTypeBoolean } from "sequelize";
import { DataTypes } from "sequelize/types";
import club from './club';


export default class match extends Model {
    public id: { type: DataTypes.IntegerDataType, primaryKey: true, autoIncrement: true },
    public home_team:{ type: DataTypes.NumberDataType, allowNull: false },
    public home_team_goals:{ type: DataTypes.NumberDataType, allowNull: false },
    public away_team:{ type: DataTypes.NumberDataType, allowNull: false },
    public away_team_goals:{ type: DataTypes.NumberDataType, allowNull: false },
    public in_progress: { type: DataTypeBoolean, allowNull: false }

    static associate(models) {
    match.belongsTo(club, { foreignKey: 'home_team', as: 'id' });
    match.belongsTo(club, { foreignKey: 'away_team', as: 'id' });
      
    }
  };

  match.init({
    id: DataTypes.NUMBER,
    home_team: DataTypes.NUMBER,
    home_team_goals: DataTypes.NUMBER,
    away_team: DataTypes.NUMBER,
    away_team_goals: DataTypes.NUMBER,
    in_progress: DataTypes.BOOLEAN
  }, {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'match',
  });
  