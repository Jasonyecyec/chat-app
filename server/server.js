const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

ioServer.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join room", (data) => {
    socket.join(data);
    console.log(`User with id:${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
