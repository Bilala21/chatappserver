
require("dotenv").config();
const app = require("express")();
const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const messages = [];
const users = [];
let index = 0;

io.on("connection", (socket) => {
    console.log("connection established");
    socket.emit("onlin-users",users)
    socket.emit("current-user-id",socket.id)
  // handle incoming chat messages
  socket.on("login", (data) => {
    // broadcast the message to all connected clients except the sender
    users.push(data)
    socket.emit("loggedIn",socket.id)
    socket.broadcast.emit("new-online-user", data);
  });
  socket.on("disconnect",()=>{
    io.emit("user-left",socket.id)
  })
});
