const express = require("express");
const { AuthController } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const logMiddleware = require("../middleware/log.middleware");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.get("/validate", authMiddleware, (req, res) => {
  return res.json({
    valid: true,
    user: req.tokenData,
  });
});

router.post(
  "/logout",
  authMiddleware,
  logMiddleware({
    activityType: "Logout",
    module: "Minha conta",
  }),
  AuthController.logout,
);

module.exports = router;
