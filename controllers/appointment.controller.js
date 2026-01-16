const { v4: uuidv4 } = require("uuid");
const { Appointment, User } = require("../models");

const AppointmentController = {
  getAppointments: async (req, res) => {
    try {
      const userId = req.userId;
      const typeUser = req.typeUser;

      const where = {};

      if (typeUser !== "admin") {
        where.id_user = userId;
      }

      const appointments = await Appointment.findAll({
        where,
        attributes: ["id_appointment", "date", "room", "status", "id_user"],
        include: [
          {
            model: User,
            attributes: ["name", "type_user", "last_name"],
          },
        ],
        order: [["date", "DESC"]],
      });

      const formatted = appointments.map((item) => {
        const appointment = item.get();
        const user = item.User.get();

        return {
          ...appointment,
          ...user,
          full_name: `${user.name} ${user.last_name}`,
          User: undefined,
        };
      });

      return res.status(200).json(formatted);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar agendamentos",
      });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const userId = req.userId;
      const { date, room } = req.body;

      const appointment = await Appointment.create({
        id_appointment: uuidv4(),
        date: date || null,
        room: room || null,
        id_user: userId,
      });

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar o agendamento" });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const userId = req.userId;
      const { appointmentId } = req.params;
      const { date, room, status } = req.body;

      if (req.typeUser !== "admin" && status === "scheduled") {
        return res.status(401).json({
          message: "Apenas Administrador pode aprovar status.",
        });
      }

      if (req.typeUser !== "admin") {
        const exists = await Appointment.count({
          where: {
            id_appointment: appointmentId,
            id_user: userId,
          },
        });

        if (exists === 0) {
          return res.status(404).json({
            message: "Agendamento não encontrado",
          });
        }
      }

      const dataToUpdate = {};

      if (date !== undefined) {
        dataToUpdate.date = date;
      }

      if (room !== undefined) {
        dataToUpdate.room = room;
      }

      if (status !== undefined) {
        dataToUpdate.status = status;
      }

      if (Object.keys(dataToUpdate).length === 0) {
        return {
          message: "Nenhum campo informado para atualização",
        };
      }

      const [affectedRows] = await Appointment.update(dataToUpdate, {
        where: {
          id_appointment: appointmentId,
        },
      });

      return res.status(201).json(affectedRows);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar o agendamento" });
    }
  },
};

module.exports = AppointmentController;
