// class Avtomobil {
//     constructor(marka) {
//       this.marka = marka;
//     }
  
//     avtoInfo(yil, rang) {
//       console.log(
//         `
//           Avtomobil markasi: ${this.marka}, 
//           Ishlab chiqarilgan yil: ${yil}
//           rangi: ${rang}
//         `
//       );
//     }
//   }
//   const avto1 = new Avtomobil("Nexia");
  
//   avto1.avtoInfo("2020", "sariq");
  
//   avto1.avtoInfo.call({ marka: "spark" }, "2023", "qora");
  
//   avto1.avtoInfo.apply({ marka: "spark" }, ["2023", "qora"]);
  
//   const newAvto1 = avto1.avtoInfo.bind({ marka: "spark" }, "2023", "qora");
//   newAvto1();





//?      Abort Controller


const controller = new AbortController();
const signal = controller.signal;

setTimeout(() => controller.abort(), 5000);