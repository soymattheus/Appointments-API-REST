const { v4: uuidv4 } = require("uuid");
const { Room } = require("../models");

const RoomController = {
  createRoom: async (req, res) => {
    try {
      if (req.typeUser !== "admin") {
        return res.status(401).json({
          message: "Apenas Administrador pode criar sala.",
        });
      }

      const { name, init_time, end_time, block_of_schedules } = req.body;

      const room = await Room.create({
        id_room: uuidv4(),
        name: name,
        init_time: init_time,
        end_time: end_time,
        block_of_schedules: block_of_schedules,
      });

      return res.status(201).json(room);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar a sala" });
    }
  },

  getRoom: async (req, res) => {
    try {
      const rooms = await Room.findAll();
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao consultar as salas" });
    }
  },

  updateRoom: async (req, res) => {
    try {
      if (req.typeUser !== "admin") {
        return res.status(401).json({
          message: "Apenas Administrador pode atualizar sala.",
        });
      }

      const { id_room, name, init_time, end_time, block_of_schedules } =
        req.body;

      const room = await Room.update(
        {
          name: name,
          init_time: init_time,
          end_time: end_time,
          block_of_schedules: block_of_schedules,
        },
        {
          where: {
            id_room: id_room,
          },
        },
      );

      return res.status(200).json(room);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar a sala" });
    }
  },
};

module.exports = RoomController;
