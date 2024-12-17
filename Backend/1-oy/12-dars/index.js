// const array = [3, 7, 2, 5, 10, 4];

// const max = array.reduce((acc, curr) => {
//   if(curr > acc){
//     return curr;
//   }
//   else{
//     return acc;
//   }
// }, array[0]);

// console.log(max); // 10















// let arr = [1,23,4,5,6];

// const norm = arr.reduce((i, item) => {
//     i += item
//     return i / arr.length
// }, 0)

// console.log(norm);
  






// const arr = [1,2,3,4,4,5];

// Array.prototype.uzReduce = function(callback, start){
//     let responce = start;
//     for(let i = 0; i < this.length; i++){
//         responce = callback(responce, this[i]);
//     }
//     return responce;
// };

// const sumAll2 = arr.uzReduce(function(acc, item){
//     return acc + item;
// }, 0);

// console.log("SumAll2", sumAll2);





// const array = [12, 15, 12, 21, 30, 15, 15, 12];

// function countElements(arr) {
//   const counts = {};
//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i];
//     if (counts[item]) {
//       counts[item]++;
//     } else {
//       counts[item] = 1;
//     }
//   }
//   return counts;
// }

// const elementCounts = countElements(array);

// console.log(elementCounts);




// const duplicateReduce = array.reduce(function(duplicate, elem){
//     if(duplicate[elem]){
//         duplicate[elem] += 1;
//     }else{
//         duplicate[elem] = 1;
//     }
//     return duplicate;
// }, {});

// console.log(duplicateReduce);




// let arr = ["a","salom", "sal", "alik", "Shoxrux"]
// let max = ""
// for (let i in arr){
//     if(arr[i].length > max){
//         max = arr[i].length
//     }

// }
// console.log(max);