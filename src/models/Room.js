module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id_room: {
        type: DataTypes.STRING(100),
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
    },
    {
      tableName: "tb_room",
      timestamps: false, // não existe created_at / updated_at
    },
  );

  Room.associate = (models) => {
    Room.hasMany(models.Appointment, {
      foreignKey: "id_room",
    });
  };

  return Room;
};
