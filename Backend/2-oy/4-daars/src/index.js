// import http, { request } from "http";

// const server = http.createServer((request, response) => {
//   console.log("sorov url", request.url);
//   console.log("sorov methodi", request.method);
//   response.setHeader("Content-type", "text/plain");
//   response.end("Salom hammaga");
// });

// server.listen(3000, () => {
//   console.log("Server 3000 portida ishladi");
// });













import http from "http" ;
import fs from "fs/promises"
const server = http.createServer((request, response) => {
    console.log("Sorov url", request.url);
    console.log("Sorov metodi", request.method);
    let body = " "
    
    request.on("data", (chunk) => {
        body += chunk;
        console.log(body);
    });

    request.on("end", () => {
        const avto = JSON.parse(body);
        console.log(avto.company);
        console.log(avto.model);
    });
})

server.listen(3000, () => {
    console.log("Server 3000 portida ishladi");
})





async function faylgaYozish(manzil, malumot){
    
}