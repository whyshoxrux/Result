// let myMap = new Map();

// myMap.set('kalit1', 'qiymat');
// myMap.set('kalit2', 'qiymat');

// console.log(myMap.get('kalit1'));









// const myMap = new Map();

// myMap.set('kalit1', 'qiymat1');
// myMap.set('kalit2', 'qiymat2');
// myMap.set('kalit3', 'qiymat3');

// myMap.forEach((value, key) => {
//     console.log(value, key);
// });











// const map = new Map();


// map.set('massiv', [1])

// map.get('massiv').push(2)

// map.get('massiv')
// console.log(map);







// let mySet = new Set();

// mySet.add(1);
// mySet.add(5);
// mySet.add(5);  // takroriy qiymat qabul qilinmaydi

// mySet.delete(1)
// console.log(mySet);






let myMap = new Map();

myMap.set('Ali', ['Matematika','Fizika']);
myMap.set("Sherzod",['Kimyo', 'Matematika']);
myMap.set("Ahmad",['Biologiya', 'Fizika'])


let map = new Map()

// console.log(myMap);

myMap.forEach((value, key) => {
        if(!map.has(value)){

            map.set(value, [])
        }
        map.get(value).push(key)
    })
console.log(map);