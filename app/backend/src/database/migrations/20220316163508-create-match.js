// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('matches', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       home_team: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'club',
//           key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//       },
//       home_team_goals: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         type: Sequelize.INTEGER
//       },
//       away_team: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'club',
//           key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//       },
//       away_team_goals: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         type: Sequelize.INTEGER
//       },
//       in_progress: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('matches');
//   }
// };