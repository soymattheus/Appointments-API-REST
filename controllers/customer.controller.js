const { User } = require("../models");

const CustomerController = {
  getCustomerList: async (req, res) => {
    try {
      const typeUser = req.typeUser;

      if (typeUser !== "admin") {
        return res.status(401).json({
          message: "Apenas administradores podem consultar a lista de clientes",
        });
      }

      const users = await User.findAll({
        where: { type_user: "customer" },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar clientes",
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      let userId = "";

      if (req.typeUser !== "admin") {
        userId = req.userId;
      } else {
        const { idUser } = req.params;
        userId = idUser;
      }

      console.log(userId);

      if (
        req.typeUser === "customer" &&
        (req.body.permissionAppointments !== undefined ||
          req.body.permissionLogs !== undefined)
      ) {
        return res
          .status(401)
          .json({ message: "Apenas Admin podem alterar permissões de acesso" });
      }

      const dataToUpdate = {};

      if (req.body.name) dataToUpdate.name = req.body.name;
      if (req.body.lastName) dataToUpdate.last_name = req.body.lastName;
      if (req.body.email) dataToUpdate.email = req.body.email;

      if (req.body.password) {
        dataToUpdate.password = await bcrypt.hash(req.body.password, 10);
      }

      if (req.body.zipCode !== undefined)
        dataToUpdate.zip_code = req.body.zipCode;
      if (req.body.street !== undefined) dataToUpdate.street = req.body.street;
      if (req.body.houseNumber !== undefined)
        dataToUpdate.house_number = req.body.houseNumber;
      if (req.body.complement !== undefined)
        dataToUpdate.complement = req.body.complement;
      if (req.body.neighborhood !== undefined)
        dataToUpdate.neighborhood = req.body.neighborhood;
      if (req.body.city !== undefined) dataToUpdate.city = req.body.city;
      if (req.body.state !== undefined) dataToUpdate.state = req.body.state;
      if (req.body.permissionAppointments !== undefined)
        dataToUpdate.permission_appointments = req.body.permissionAppointments;
      if (req.body.permissionLogs !== undefined)
        dataToUpdate.permission_logs = req.body.permissionLogs;

      if (Object.keys(dataToUpdate).length === 0) {
        return { message: "Nenhum campo informado para atualização" };
      }

      const [affectedRows] = await User.update(dataToUpdate, {
        where: { id_user: userId },
      });

      return res
        .status(200)
        .json({ message: "Perfil atualizado com suacesso!" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar perfil." });
    }
  },
};

module.exports = CustomerController;
