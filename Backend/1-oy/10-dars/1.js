// let avtomobil = {
//     marka: "Toyota",
//     model: "Camry",
//     yil: 2020,
//     rang: "Ko'k"
// };

// console.log(avtomobil.marka); //Toyota
// console.log(avtomobil['model']);//Camry


// avtomobil.rang = 'qizil';
// console.log(avtomobil.rang); // qizil

// avtomobil.egasi = 'Akmal';
// console.log(avtomobil.egasi); //Akmal







// function findMax(arr, n) {
//     if (n == 1) {
//       return arr[0];
//     }
  
//     return Math.max(arr[n - 1], findMax(arr, n - 1));
//   }
  
//   let arr = [1, 5, 3, 9, 2];
//   let n = arr.length;
//   console.log("Massivdagi eng katta qiymat: " + findMax(arr, n));
  





// // Kompdagi soat
// let hozir = new Date();
// console.log(hozir);

// // Yilni olish
// let yil = hozir.getFullYear();


// //Soatni olish
// let soat = hozir.getHours();
// console.log(soat);


// //Yilni ornatish
// hozir.setFullYear(2025);
// console.log(hozir);




// let matn = 'Salom, dunyo';
// console.log(matn.slice(0, 5));





// console.log(teskari("Salom"))
// function teskari(n, m = ""){
//     for(let i = n.length - 1; i >= 0; i--){
//         m += n[i]
//     }
//     return m
// }









Array.prototype.teskari = function(){
    let arr = 0;
    for(let i = this.length - 1; i >= 0; i--){
        arr += this[i];
    }
    return arr;
};

matn = [1,2,3,4,5];
console.log(matn.teskari())