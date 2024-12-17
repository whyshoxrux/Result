// const os = require("os");

// console.log(os.totalmem() / (1024 * 1024 * 1024));
// console.log(freemem = os.freemem() / (1024 ** 3));

// if(freemem < 0.5){
//     console.log("Vaqtinchaliik xotirada joy qolmadi");
// }else{
//     console.log("Hammasi chotki");
// }

// const cpuInfo = os.cpus();
// console.log(cpuInfo);

// cpuInfo.forEach((cpu, index) => {
//     console.log(`Yadro ${index}: ${cpu.speed} MHz`);
// })

// console.log("Tizim yuklangan vaqti: ", os.uptime() / (60*60));

const path = require("path");
// console.log(path.join(__dirname, ".."));
// console.log(path.basename(__filename));  //! basename oxiridagi fayl nomini olib beradi

const fs = require("fs/promises");

// fs.readFile(
//   path.join(__dirname, "..", "nodemon.json"),
//   "utf-8",
//   (err, data) => {
//     if (err) {
//       console.error("Xatolik: ", err);
//       return;
//     }
//     console.log("Fayl mazmuni: ", data);
//   }
// );

// async function fayldanOqish() {
//   try {
//     const data1 = await fs.readFile(
//       path.join(__dirname, "..", "nodemon.json"), "utf8"
//     );
//     console.log(data1);
//   } catch (err) {
//     console.log("Xato boldi", err);
//   }
// }
// fayldanOqish();






const avto = {
    company
}
const fs = require('fs/promises');

async function writeFile(){
    try {
        await fs.writeFile("avto.txt", )
    }
}