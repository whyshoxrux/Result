// let salomlashMixin = {
//     salomlash(){
//         console.log(`Salom, mening ismim ${this.ism}`);
//     },
//     xayrlash(){
//         console.log(`Xayr. ${this.ism}`);
//     }
// };

// class Foydalanvchi{
//     constructor(ism){
//         this.ism = ism;
//     }
// }

// Object.assign(Foydalanvchi.prototype, salomlashMixin);

// let foydalanuvchi = new Foydalanvchi("Dil");
// foydalanuvchi.salomlash();
// foydalanuvchi.xayrlash();









// const a = 1
// try {
//     if(a === 1){
//         throw new Error("Juda kotta xato")
//     } else{
//         console.log("Kod ishladi");
//     }
// }catch(xato){
//     console.log("Kodni yurgazishda xatolik boldi:", xato.message);
// }






// const promise = new Promise(function(resolve, reject){
//     setTimeout(() =>{
//         reject("Xatolik bor")9
//     }, 2000)
// })


// promise.then(function(natija){
//     console.log("natija chiqdi", natija);
// }).catch(function(xato){
//     console.log("Promisda xatolik", xato);
// }).finally(function(){
//     console.log("Promise tugadi");
// })




//!  async funksiya



// function oshQilish(maxsulotlar) {
//     return new Promise(function (resolve, reject) {
//       const { guruch, sabzi, yog, gosht } = maxsulotlar;
//       if (!guruch || !sabzi || !yog || !gosht) {
//         return reject("maxsulotlar yetarli emas");
//       }
//       console.log("yogni quy");
//       setTimeout(() => {
//         console.log("goshtni sol");
//         setTimeout(() => {
//           console.log("sabzni sol");
//           setTimeout(() => {
//             console.log("guruchni sol");
//             setTimeout(() => {
//               resolve("osh pishti");
//             }, 3000);
//           }, 3000);
//         }, 3000);
//       }, 3000);
//     });
//   }


// oshQilish(maxsulotlar)
//   .then(function (natija) {
//     console.log("osh qilish natijasi", natija);
//   })
//   .catch(function (xato) {
//     console.log("osh qilishda xato boldi", xato);
//   });










// (async function () {
//     try {
//       const maxsulotlar = { guruch: true, sabzi: true, yog: true, gosht: true };
//       const natija = await oshQilish(maxsulotlar);
//       console.log("osh qilish natijasi", natija);
//     } catch (xato) {
//       console.log("osh qilishda xato boldi", xato);
//     }
//   })();
  
//!  myPromise 


// let myPromise = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         resolve(10);
//     }, 1000)
// });

// myPromise
// .then(function(value){
//     console.log(value);
//     return value * 2;
// })
// .then(function(newValue){
//     console.log(newValue);
//     return newValue * 3;
// })
// .then(function(finalValue){
//     console.log(finalValue);
// })
// .catch(function(error){
//     console.log(error);
// });






function take_info(url){
    return new Promise((halQilish, radEtish) => {
        setTimeout(() => {
            const malumotlar = {id: 1, ism: "Mahmud"};
            halQilish(malumotlar);
        }, 2000)
    })
}


async function show_info(){
    console.log("Malumotlar olinmoqda...");
    try {
        const malumotlar = await take_info("https://example.com/api/data");
        console.log("Olingan malumotlar: ", malumotlar);
    }catch(xato){
        console.error("Xatolik yuz berdi: ", xato);
    }
}
show_info();