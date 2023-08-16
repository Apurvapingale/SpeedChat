const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

//static is the middleware
app.use(express.static(__dirname + "/public"));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//socket setup
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (msq) => {
    socket.broadcast.emit("message", msq);
  });
});
