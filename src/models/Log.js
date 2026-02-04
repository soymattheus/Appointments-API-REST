module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      id_log: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("(UUID())"),
        primaryKey: true,
        allowNull: false,
      },
      activity_type: {
        type: DataTypes.STRING(90),
        allowNull: true,
      },
      module: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      id_user: {
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
      tableName: "tb_log",
      timestamps: true,
      underscored: true,
    },
  );

  Log.associate = (models) => {
    Log.belongsTo(models.User, {
      foreignKey: "id_user",
    });
  };

  return Log;
};
