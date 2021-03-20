const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  console.log(`We have a new connection!`);

  // join a room
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "Admin",
      text: `${user.name}, welcome to room ${user.room}.`,
      type: `info`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has joined the chat!`,
      type: `info`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // send message
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      type: `chat`,
    });
    callback();
  });

  socket.on("sendMessageToUser", (data, callback) => {
    const user = getUser(socket.id);
    const friend = getUser(data.friend);
    console.log(friend);
    io.to(friend.id).emit("message", {
      user: user.name,
      text: data.message,
      type: `DM`,
    });
    io.to(socket.id).emit("message", {
      user: user.name,
      text: data.message,
      type: `DM`,
    });
    callback();
  });

  // disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left the chat.`,
        type: `info`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
