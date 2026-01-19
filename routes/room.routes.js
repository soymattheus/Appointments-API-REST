const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const RoomController = require("../controllers/room.controller");

const router = express.Router();

router.post("/", authMiddleware, RoomController.createRoom);
router.get("/", authMiddleware, RoomController.getRoom);
router.put("/", authMiddleware, RoomController.updateRoom);

module.exports = router;
