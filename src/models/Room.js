module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id_room: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("(UUID())"),
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },

      init_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      block_of_schedules: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      tableName: "tb_room",
      timestamps: true,
    },
  );

  Room.associate = (models) => {
    Room.hasMany(models.Appointment, {
      foreignKey: "id_room",
    });
  };

  return Room;
};
