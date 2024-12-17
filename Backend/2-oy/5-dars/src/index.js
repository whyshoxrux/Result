import http from "http";
import { Server as SocketIO } from "socket.io";

const server = http.createServer();
const io = new SocketIO(server);

io.on("connection", (socket) => {
  console.log("Foydalanuvchi qoshildi");

  socket.on("sms1", (habar) => {
    console.log("SMS keldi", habar);

    io.emit("sms2", habar);
  });
});

server.listen(3000, () => {
  console.log("Server 3000 portida ishlayapti");
});
