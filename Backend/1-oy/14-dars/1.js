// let mevalar = ['olma', 'anor', 'gilos']
// let yangi = [...mevalar]
// yangi.push('olcha')
// console.log(yangi);
// console.log(mevalar);




// let meva = ['olma', 'anor']
// let sabzavot = ['sabzi', 'kartoshka'];

// let oziq = [...meva, ...sabzavot]
// console.log(oziq);





// let numbers = [1, [2,3], 4];

// let [first, [second, third], fourth] = numbers;
// console.log(first)
// console.log(second)
// console.log(third)
// console.log(fourth)





// let inson = {
//     ism: 'Ali',
//     yosh: '18',
//     kasb: 'dasturchi'
// };

// let {ism, yosh, kasb} = inson;
// console.log(ism);
// console.log(yosh);
// console.log(kasb);








// let inson = {
//     ism: 'ali',
//     yosh: 25,
//     kasb: 'dasturchi'
// };

// let {ism: ismi, yosh: yoshi, kasb: kasbi} = inson;

// console.log(ismi);
// console.log(yoshi);
// console.log(kasbi);










// let family = {
//     ota: {
//         ism: 'Ali',
//         yosh: 50
//     },
//     ona: {
//         ism: 'Zarina',
//         yosh: '45'
//     }
// };

// let {
//     ota: {ism: otaningIsmi, yosh: otaningYoshi},
//     ona: {ism: onaningIsmi, yosh: onaningYoshi}
// } = family;

// console.log(otaningIsmi, otaningYoshi);
// console.log(onaningIsmi, onaningYoshi);









// let inson = {ism: 'Ali', yosh: 25};
// let neww = {...inson};
// console.log(neww);









// let main = {name: 'Ali', age: 25};
// let add = {job: 'IT', address: 'Tashkent'};

// let full = {...main, ...add}
// console.log(full);





// let person = {name: 'Ali', age: 25};
// let add = {...person, job: 'IT'};

// console.log(add);





// let numbers = [1,2,3];

// function yig(a,b,c){
//     return a+b+c;
// }
// console.log(yig(...numbers));




//?  JSON ////////////////////////////////////////////////////////////////////////////////////

// let person = {name: 'Ali', age: 25};
// let jsonString = JSON.stringify(person);

// console.log(jsonString);



// let personn = JSON.parse(jsonString);
// console.log(personn);











// let fruits = ['olma', 'banana', 'gilos', 'anor', 'uzum', 'olxori'];

// let [, first,, third,, fifth] = fruits;

// console.log(first);
// console.log(third);
// console.log(fifth);








// function ikki(a,b,c,d,e){
//     return [a * 2, b * 2,c * 2, d*2,e*2];
// }

// let number = [1,2,3,4,5]
// console.log((ikki(...number)));





// let family = {
//     dad: {name: 'Ali', age: 50},
//     mom: {name: 'Zarina', age: 45},
//     child: {name: 'Olim', age: 20}
// };


// let {
//     dad: {name: nameDad, age: ageDad},
//     mom: {name: nameMom, age: ageMom},
//     child: {name: nameChild, age: ageChild}
// } = family;

// console.log(nameDad, ageDad);
// console.log(nameMom, ageMom);
// console.log(nameChild, ageChild);







// let people = [
//     {name: 'Vali', age: 25},
//     {name: 'ali', age: 30},
//     {name: 'Zarina', age: 28}
// ];

// let [{name: name1}, {name: name2}, {name: name3}] = people
// console.log(name1);
// console.log(name2);
// console.log(name3);