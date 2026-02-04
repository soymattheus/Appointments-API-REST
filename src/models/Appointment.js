module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      id_appointment: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("(UUID())"),
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      room: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(14),
        allowNull: true,
        defaultValue: "under_analysis",
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_room: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tb_appointment",
      timestamps: true,
      underscored: true,
    },
  );

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, {
      foreignKey: "id_user",
    });

    Appointment.belongsTo(models.Room, {
      foreignKey: "id_room",
    });
  };
  // Appointment.associate = (models) => {
  //   Appointment.belongsTo(models.Room, {
  //     foreignKey: "id_room",
  //   });
  // };

  return Appointment;
};
