//! Mijozlar Buyurtmalari:
//!Har bir mijozning buyurtma raqami va mahsulotlari ro'yxatini Map yordamida saqlang. Mahsulot nomlari va ularning qancha marta buyurtma qilinganligini hisoblang va eng ko'p buyurtma qilingan mahsulotni toping.


// let mijozlarBuyurtmalari = new Map([
//     ['Mijoz1', new Map([['buyurtma1', ['MahsulotA', 'MahsulotB', 'MahsulotC']]])],
//     ['Mijoz2', new Map([['buyurtma2', ['MahsulotA', 'MahsulotD']]])],
//     ['Mijoz3', new Map([['buyurtma3', ['MahsulotB', 'MahsulotC', 'MahsulotA']]])]
// ]);

// let mahsulotSoni = new Map();

// mijozlarBuyurtmalari.forEach((buyurtmalar) => {
//     buyurtmalar.forEach((mahsulotlar) => {
//         mahsulotlar.forEach((mahsulot) => {
//             if (mahsulotSoni.has(mahsulot)) {
//                 mahsulotSoni.set(mahsulot, mahsulotSoni.get(mahsulot) + 1);
//             } else {
//                 mahsulotSoni.set(mahsulot, 1);
//             }
//         });
//     });
// });

// let engKopBuyurtmaQilinganMahsulot = '';
// let maxSoni = 0;

// mahsulotSoni.forEach((soni, mahsulot) => {
//     if (soni > maxSoni) {
//         maxSoni = soni;
//         engKopBuyurtmaQilinganMahsulot = mahsulot;
//     }
// });

// console.log("Mahsulotlar va ularning buyurtma soni:", Array.from(mahsulotSoni.entries()));
// console.log("Eng ko'p buyurtma qilingan mahsulot:", engKopBuyurtmaQilinganMahsulot);






















//!  Bozor Narxlari:
//!  Har bir mahsulotning bozor narxlari tarixini Map yordamida saqlang. Har bir mahsulot uchun narxning o'rtacha qiymatini hisoblang va narxi eng ko'p o'zgargan mahsulotni toping.


// let productPrices = new Map();

// function addProductPrice(product, price) {
//     if (!productPrices.has(product)) {
//         productPrices.set(product, []);
//     }
//     productPrices.get(product).push(price);
// }

// addProductPrice('Olma', 1000);
// addProductPrice('Olma', 1200);
// addProductPrice('Olma', 1100);
// addProductPrice('Banan', 2000);
// addProductPrice('Banan', 2100);
// addProductPrice('Banan', 1900);
// addProductPrice('Apelsin', 1500);
// addProductPrice('Apelsin', 1600);
// addProductPrice('Apelsin', 1550);

// function average(prices) {
//     let sum = prices.reduce((acc, price) => acc + price, 0);
//     return sum / prices.length;
// }

// let averagePrices = new Map();
// productPrices.forEach((prices, product) => {
//     averagePrices.set(product, average(prices));
// });

// let maxPriceChangeProduct = '';
// let change = 0;

// productPrices.forEach((prices, product) => {
//     let minPrice = Math.min(...prices);
//     let maxPrice = Math.max(...prices);
//     let priceChange = maxPrice - minPrice;

//     if (priceChange > change) {
//         change = priceChange;
//         maxPriceChangeProduct = product;
//     }
// });

// console.log('O\'rtacha narxlar:');
// averagePrices.forEach((avgPrice, product) => {
//     console.log(`${product}: ${avgPrice}`);
// });

// console.log(`Narxi eng ko'p o'zgargan mahsulot: ${maxPriceChangeProduct}`);













//!  Talabalar To'plami:
//!Har bir talabaning kurslari va ularning ballarini Map yordamida saqlang. Har bir kurs uchun o'rtacha ballarni hisoblang va eng yuqori o'rtacha ballga ega kursni toping.


// const oquvchilar = new Map();
// oquvchilar.set("Ali", { matematika: 85, fizika: 95 });
// oquvchilar.set("Sherzod", { matematika: 95, ximiya: 80 });
// oquvchilar.set("Vali", { fizika: 70, biologiya: 75 });

// const fanlarToplam = new Map();

// oquvchilar.forEach((fanlarObj) => {
//   for (const fan in fanlarObj) {
//     if (!fanlarToplam.has(fan)) {
//       fanlarToplam.set(fan, { yigindi: 0, soni: 0 });
//     }
//     fanlarToplam.set(fan, {
//       yigindi: fanlarToplam.get(fan).yigindi + fanlarObj[fan],
//       soni: fanlarToplam.get(fan).soni + 1,
//     });
//   }
// });

// let maxFan = "";
// let maxFanQiy = 0;

// fanlarToplam.forEach((fanHisobi, fan) => {
//   const ortacha = fanHisobi.yigindi / fanHisobi.soni;
//   console.log(fan, "ortacha baho", ortacha);
//   if (maxFanQiy < ortacha) {
//     maxFanQiy = ortacha;
//     maxFan = fan;
//   }
// });
// console.log(`Eng yaxshi ozlashtirilgan fan: ${maxFan}, qiymati: ${maxFanQiy}`);












//! Xodimlar Ma'lumotlari:
//! Har bir xodimning ismi, lavozimi va yillik maoshini Map yordamida saqlang. Eng yuqori maosh oluvchi xodimni toping va maoshlarni ko'paytirish uchun barcha xodimlarning maoshini 10% ga oshiring.


// let employees = new Map();

// function addEmployee(name, position, salary) {
//     employees.set(name, { position: position, salary: salary });
// }

// addEmployee('Ali', 'Dasturchi', 50000);
// addEmployee('Sherzod', 'Boshqaruvchi', 60000);
// addEmployee('Vali', 'Muhandis', 55000);

// let highestPaidEmployee = '';
// let highestSalary = 0;

// employees.forEach((details, name) => {
//     if (details.salary > highestSalary) {
//         highestSalary = details.salary;
//         highestPaidEmployee = name;
//     }
// });

// console.log(`Eng yuqori maosh oluvchi xodim: ${highestPaidEmployee}, Maoshi: ${highestSalary}`);

// employees.forEach((details, name) => {
//     details.salary *= 1.10;
//     employees.set(name, details);
// });

// console.log('Maoshlar 10% ga oshirilgandan keyingi holat:');
// employees.forEach((details, name) => {
//     console.log(`${name}: Lavozimi: ${details.position}, Yillik maoshi: ${details.salary.toFixed(2)}`);
// });
















//!  Saylov Natijalari:
//!  Har bir saylov uchastkasidagi ovoz beruvchilar ro'yxatini Set yordamida saqlang. Bir nechta uchastkada ovoz bergan shaxslarni toping.



// let electionStations = new Map();

// electionStations.set('Joy 1', new Set(['Ali', 'Sherzod', 'Vali']));
// electionStations.set('Joy 2', new Set(['Ali', 'Husan', 'Gulnoza']));
// electionStations.set('Joy 3', new Set(['Sherzod', 'Vali', 'Murod']));

// let allVoters = new Set();
// electionStations.forEach(voters => {
//     voters.forEach(voter => {
//         allVoters.add(voter);
//     });
// });

// let voterCount = new Map();
// allVoters.forEach(voter => {
//     voterCount.set(voter, 0);
// });

// electionStations.forEach(voters => {
//     voters.forEach(voter => {
//         voterCount.set(voter, voterCount.get(voter) + 1);
//     });
// });

// let multipleStationsVoters = [];
// voterCount.forEach((count, voter) => {
//     if (count > 1) {
//         multipleStationsVoters.push(voter);
//     }
// });

// console.log('Bir nechta uchastkada ovoz bergan shaxslar:');
// console.log(multipleStationsVoters);




















//! Loyihalar va Ishchilar:
//! Har bir loyiha uchun ishlayotgan ishchilar ro'yxatini Set yordamida saqlang. Bir nechta loyihada ishlayotgan ishchilarni toping.


// let electionStations = new Map();

// electionStations.set('Joy 1', new Set(['Ali', 'Sherzod', 'Vali']));
// electionStations.set('Joy 2', new Set(['Ali', 'Husan', 'Gulnoza']));
// electionStations.set('Joy 3', new Set(['Sherzod', 'Vali', 'Murod']));

// let allVoters = new Set();
// electionStations.forEach(voters => {
//     voters.forEach(voter => {
//         allVoters.add(voter);
//     });
// });

// let voterCount = new Map();
// allVoters.forEach(voter => {
//     voterCount.set(voter, 0);
// });

// electionStations.forEach(voters => {
//     voters.forEach(voter => {
//         voterCount.set(voter, voterCount.get(voter) + 1);
//     });
// });

// let multipleStationsVoters = [];
// voterCount.forEach((count, voter) => {
//     if (count > 1) {
//         multipleStationsVoters.push(voter);
//     }
// });

// console.log('Bir nechta uchastkada ovoz bergan shaxslar:');
// console.log(multipleStationsVoters);



















//! Loyihalar va Ishchilar:
//! Har bir loyiha uchun ishlayotgan ishchilar ro'yxatini Set yordamida saqlang. Bir nechta loyihada ishlayotgan ishchilarni toping.


// let projects = new Map();

// projects.set('Loyiha 1', new Set(['Ali', 'Dil', 'Sami']));
// projects.set('Loyiha 2', new Set(['Dil', 'Husan', 'Gulnoza']));
// projects.set('Loyiha 3', new Set(['Ali', 'Sami', 'Murod']));

// let allWorkers = new Set();
// projects.forEach(workers => {
//     workers.forEach(worker => {
//         allWorkers.add(worker);
//     });
// });
// let workerCount = new Map();
// allWorkers.forEach(worker => {
//     workerCount.set(worker, 0);
// });

// projects.forEach(workers => {
//     workers.forEach(worker => {
//         workerCount.set(worker, workerCount.get(worker) + 1);
//     });
// });

// let multipleProjectsWorkers = [];
// workerCount.forEach((count, worker) => {
//     if (count > 1) {
//         multipleProjectsWorkers.push(worker);
//     }
// });

// console.log('Bir nechta loyihada ishlayotgan ishchilar:');
// console.log(multipleProjectsWorkers);


















//!  Shopping Kartalar:
//! Har bir foydalanuvchining shopping kartasidagi mahsulotlar ro'yxatini Set yordamida saqlang. Eng ko'p qo'shilgan mahsulotni toping.

// let shoppingCarts = new Map();

// shoppingCarts.set('User1', new Set(['Olma', 'Banan', 'Apelsin']));
// shoppingCarts.set('User2', new Set(['Olma', 'Apelsin', 'Gilos']));
// shoppingCarts.set('User3', new Set(['Banan', 'Gilos', 'Olma']));

// let allProducts = new Set();
// shoppingCarts.forEach(products => {
//     products.forEach(product => {
//         allProducts.add(product);
//     });
// });

// let productCount = new Map();
// allProducts.forEach(product => {
//     productCount.set(product, 0);
// });

// shoppingCarts.forEach(products => {
//     products.forEach(product => {
//         productCount.set(product, productCount.get(product) + 1);
//     });
// });

// let mostAddedProduct = '';
// let maxCount = 0;

// productCount.forEach((count, product) => {
//     if (count > maxCount) {
//         maxCount = count;
//         mostAddedProduct = product;
//     }
// });

// console.log('Eng ko\'p qo\'shilgan mahsulot:');
// console.log(mostAddedProduct);

