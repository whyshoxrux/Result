let universitet = {
    nom: "Milliy Universitet",
    joylashuv: {
      shahar: "Toshkent",
      fakultetlar: {
        informatika: {
          dekan: "Dr. Asadov",
          kurslar: [
            {
              nom: "Algoritmlar",
              oqituvchi: "Prof. Karimov",
              talaba: [
                { ism: "Ali", baho: 85 },
                { ism: "Zarina", baho: 90 },
              ],
            },
            {
              nom: "Ma'lumotlar tuzilmasi",
              oqituvchi: "Dr. Saidov",
              talaba: [
                { ism: "Olim", baho: 88 },
                { ism: "Lola", baho: 92 },
              ],
            },
          ],
        },
        matematika: {
          dekan: "Dr. Rustamov",
          kurslar: [
            {
              nom: "Chiziqli algebra",
              oqituvchi: "Prof. Rahimov",
              talaba: [
                { ism: "Ali", baho: 75 },
                { ism: "Olim", baho: 80 },
              ],
            },
            {
              nom: "Hisoblash usullari",
              oqituvchi: "Dr. Akhmedov",
              talaba: [
                { ism: "Zarina", baho: 85 },
                { ism: "Lola", baho: 87 },
              ],
            },
          ],
        },
      },
    },
  };
//! 1-masala
// let {nom: nomi, joylashuv:{shahar: univerJoyi}} = universitet;
// console.log(nomi);
// console.log(univerJoyi);




//! 2-masala

// for (const fakultet in universitet.joylashuv.fakultetlar) {
//     for (const kurs in universitet.joylashuv.fakultetlar[fakultet].kurslar) {
//       for (const talaba in universitet.joylashuv.fakultetlar[fakultet].kurslar[kurs].talaba) {
//         let talabaObj = universitet.joylashuv.fakultetlar[fakultet].kurslar[kurs].talaba[talaba];
//         if (talabaObj.baho > 85) {
//           console.log(talabaObj.baho)
//         }
//       }
//     }
//   }


//! 3-masala

// let {
//     joylashuv:{
//         fakultetlar:{
//             informatika:{
//                 kurslar:[{
//                     nom: nomi
//                 }]
//             }
//         }
//     }
//     }
//      = universitet
// console.log(nomi);



//! 4-masala

// function info(){
// for (const fakultet in universitet.joylashuv.fakultetlar){
//        let kurslar = universitet.joylashuv.fakultetlar[fakultet].kurslar;
//        for(let i = 0; i < kurslar.length; i++){
//         let kurs = kurslar[i]
//         for(let j = 0; j < kurs.talaba.length; j++){
//           let student = kurs.talaba[j]
//           console.log(`${student.ism} ismli talaba ${kurs.nom} kursidan ${student.baho} ball oldi. O'qituvchi ${kurs.oqituvchi}`);
//         }
//        }
//       } 
//   }

// info();


//! 5-masala

// for(const fakultet in universitet.joylashuv.fakultetlar){
//   let kurslar = universitet.joylashuv.fakultetlar[fakultet].kurslar;
//   for(let i = 0; i < kurslar.length; i++){
//     let kurs = kurslar[i]
//     console.log("Kurs nomi: ", kurs.nom);
//     console.log("O'qituvchi: ", kurs.oqituvchi);
//   }
// }