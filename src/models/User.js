module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("(UUID())"),
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type_user: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      zip_code: DataTypes.STRING(9),
      street: DataTypes.STRING(255),
      house_number: DataTypes.INTEGER,
      complement: DataTypes.STRING(100),
      neighborhood: DataTypes.STRING(50),
      city: DataTypes.STRING(50),
      state: DataTypes.STRING(50),
      permission_appointments: DataTypes.CHAR(1),
      permission_logs: DataTypes.CHAR(1),
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
      tableName: "tb_user",
      timestamps: true,
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Appointment, {
      foreignKey: "id_user",
    });

    User.hasMany(models.Log, {
      foreignKey: "id_user",
    });
  };

  return User;
};
