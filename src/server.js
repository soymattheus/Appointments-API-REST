const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const logsRouters = require("./routes/logs.router");
const customerRoutes = require("./routes/customer.routes");
const appointmentRoutes = require("./routes/appointments.routes");
const roomRoutes = require("./routes/room.routes");

const port = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/logs", logsRouters);
app.use("/customer", customerRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/room", roomRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
