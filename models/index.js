const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

const sequelize = new Sequelize(config);

const User = require("./User")(sequelize, DataTypes);
const Appointment = require("./Appointment")(sequelize, DataTypes);
const Log = require("./Log")(sequelize, DataTypes);
const TokenBlacklist = require("./TokenBlacklist")(sequelize, DataTypes);
const Room = require("./Room")(sequelize, DataTypes);

// associações
User.associate({ Appointment, Log });
Appointment.associate({ User, Room });
Log.associate({ User });
Room.associate({ Appointment });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Appointment,
  Log,
  TokenBlacklist,
  Room,
};
