const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const CustomerController = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", authMiddleware, CustomerController.getCustomerList);

router.put("/", authMiddleware, CustomerController.updateProfile);

router.put("/:idUser", authMiddleware, CustomerController.updateProfile);

module.exports = router;
