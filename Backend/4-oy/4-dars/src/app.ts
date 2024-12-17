//! 1-vazifa
// function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         console.time(propertyKey); 
//         const result = originalMethod.apply(this, args);
//         console.timeEnd(propertyKey); 
//         return result;
//     };

//     return descriptor;
// }

// class Calculator {
//     @measureTime
//     add(a: number, b: number): number {
//         return a + b;
//     }

//     @measureTime
//     multiply(a: number, b: number): number {
//         return a * b;
//     }
// }

// const calculator = new Calculator();
// console.log(calculator.add(5, 10));      
// console.log(calculator.multiply(3, 7)); 




//! 2-vazifa
// function readOnly(target: any, propertyKey: string) {
//     Object.defineProperty(target, propertyKey, {
//         writable: false,
//     });
// }

// class User {
//     @readOnly
//     id: number; 

//     name: string;

//     constructor(id: number, name: string) {
//         this.id = id;
//         this.name = name;
//     }
// }

// const user = new User(1, "John");

// console.log(`Oldingi id: ${user.id}`);
// user.id = 2; 
// console.log(`Yangi id: ${user.id}`);

//! 3-vazifa

// function readOnly(target: any, propertyKey: string) {
//     Object.defineProperty(target, propertyKey, {
//         writable: false, 
//         configurable: false, 
//     });
// }

// class User {
//     @readOnly
//     id: number; 

//     name: string; 

//     constructor(id: number, name: string) {
//         this.id = id; 
//         this.name = name;
//     }
// }

// const user = new User(1, "John");

// console.log(`Oldingi id: ${user.id}`);

// try {
//     user.id = 2; 
// } catch (error) {
//     console.error("id qiymatini o'zgartirishda xatolik:", error.message);
// }

// console.log(`Yangi id: ${user.id}`);


//! 4-vazifa

