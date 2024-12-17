import http from "http";
import fs from "fs";

const server = http.createServer((request, response) => {
  console.log("Sorov keldi");
  if (request.method === "POST" && request.url === "/registration") {
    response.setHeader("Content-type", "application/json");

    let body;

    request.on("data", (kelganMaulumotQismi) => {
      body = JSON.parse(kelganMaulumotQismi);
    });

    request.on("end", async () => {
      let querySet = [];

      fs.readFile("./login.json", "utf8", async (err, data) => {
        let new_login = body["login"];

        querySet = JSON.parse(data);

        querySet.forEach((element) => {
          const { login, parol } = element;

          if (login == new_login) {
            response.end("Bunday foydalanuvchi mavjud");
            return;
          }
        });

        querySet.push(body);

        fs.writeFile("./login.json", JSON.stringify(querySet), (err, data) => {
          if (err) {
            response.end("Xatolik boldi");
            return;
          }
          response.end("Malumotlar muvaffaqaiyatli yozildi");
        });
      });
    });
  }

  if (request.method === "POST" && request.url === "/login") {
    response.setHeader("Content-type", "application/json");

    let body;
    request.on("data", (kelganMaulumotQismi) => {
      body = JSON.parse(kelganMaulumotQismi);
    });

    request.on("end", async () => {
      let querySet = [];

      fs.readFile("./login.json", "utf8", async (err, data) => {
        if (err) {
          response.end("Xatolik boldi");
          return;
        }

        let new_login = body["login"];
        let new_parol = body["parol"];

        querySet = JSON.parse(data);

        await querySet.forEach((element) => {
          const { login, parol } = element;

          if (login == new_login && parol == new_parol) {
            response.end("Siz epladiz🍆");
          }
        });

        response.end("You succesfully failed🫡");
      });
    });
  }
});
server.listen(3000, () => {
  console.log("Server 3000 portida ishladi");
});
