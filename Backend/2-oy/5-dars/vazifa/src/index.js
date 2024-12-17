import http from "http";
import fs from "fs";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer((request, response) => {
  console.log("Sorov keldi");

  if (request.method === "POST" && request.url === "/registration") {
    response.setHeader("Content-type", "application/json");

    let body = '';

    request.on("data", (kelganMaulumotQismi) => {
      body += kelganMaulumotQismi;
    });

    request.on("end", async () => {
      body = JSON.parse(body);
      let querySet = [];

      fs.readFile("./login.json", "utf8", async (err, data) => {
        if (err) {
          response.end("Xatolik boldi");
          return;
        }

        let new_login = body["login"];

        querySet = JSON.parse(data);

        for (const element of querySet) {
          const { login } = element;

          if (login == new_login) {
            response.end("Bunday foydalanuvchi mavjud");
            return;
          }
        }

        querySet.push(body);

        fs.writeFile("./login.json", JSON.stringify(querySet), (err) => {
          if (err) {
            response.end("Xatolik boldi");
            return;
          }
          response.end("Malumotlar muvaffaqiyatli yozildi");
        });
      });
    });
  }

  if (request.method === "POST" && request.url === "/login") {
    response.setHeader("Content-type", "application/json");

    let body = '';
    request.on("data", (kelganMaulumotQismi) => {
      body += kelganMaulumotQismi;
    });

    request.on("end", async () => {
      body = JSON.parse(body);
      let querySet = [];

      fs.readFile("./login.json", "utf8", async (err, data) => {
        if (err) {
          response.end("Xatolik boldi");
          return;
        }

        let new_login = body["login"];
        let new_parol = body["parol"];

        querySet = JSON.parse(data);

        for (const element of querySet) {
          const { login, parol } = element;

          if (login == new_login && parol == new_parol) {
            response.end("Siz epladiz🍆");
            return;
          }
        }

        response.end("Brat registratsiya qilishiz keragakanu 🤦‍♂️");
      });
    });
  }
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('Welcome to the WebSocket server');
});

server.listen(3000, () => {
  console.log("Server 3000 portida ishladi");
});
