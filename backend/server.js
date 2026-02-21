require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const expertRoutes = require("./routes/expertRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

/* ------------------ DATABASE CONNECTION ------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ------------------ API ROUTES ------------------ */
app.use("/experts", expertRoutes);
app.use("/bookings", bookingRoutes);

/* ------------------ SOCKET CONNECTION ------------------ */
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinExpertRoom", (expertId) => {
    socket.join(expertId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* ------------------ SERVE FRONTEND (PRODUCTION) ------------------ */

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

/* ------------------ SERVER START ------------------ */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { io };