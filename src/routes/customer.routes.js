const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const CustomerController = require("../controllers/customer.controller");
const logMiddleware = require("../middleware/log.middleware");

const router = express.Router();

router.get("/", authMiddleware, CustomerController.getCustomerList);

router.put(
  "/",
  authMiddleware,
  logMiddleware({
    activityType: "Atualização de perfil",
    module: "Minha conta",
  }),
  CustomerController.updateProfile
);

router.put("/:idUser", authMiddleware, CustomerController.updateProfile);

module.exports = router;
