"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_appointments", {
      id_appointment: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      room: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_user: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      id_room: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_appointments");
  },
};
