// function rek(n, y = 0){
//     if (n > 0){
//         console.log(n)
//         n-=1
        
//         rek(n)
        
//     }
//     return y= y + n;
// }
// console.log(rek(50))












// function yigi(n){
//     if (n == 0){
//         return 0;
//     }

//     return n + yigi(n - 1);
// }

// yigi(10)







// function printArray(arr, n) {
//     if (n >= 0) {
//         console.log(arr[n]);
//         printArray(arr, n - 1);
//     }
// }

// const myArray = [1, 2, 3, 4, 5];
// printArray(myArray, myArray.length - 1);







function sumArray(arr, index = 0) {
    if (index >= arr.length) {
        return 0; // Rekursiya tugadi
    }
    return arr[index] + sumArray(arr, index + 1);
}

// Massivni test qilish
const myArray = [1, 2, 3, 4, 5];
const totalSum = sumArray(myArray);
console.log(`Massiv elementlarining yig'indisi: ${totalSum}`);
