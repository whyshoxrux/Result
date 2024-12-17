// function Shaxs(ism, yosh){
//     this.ism = ism;
//     this.yosh = yosh;


// this.salomlash = function(){
//     return `Salom, mening ismim ${this.ism} va men ${this.yosh} yoshman`
// }
// }
// const odam = new Shaxs('Dil', 30);
// console.log(odam.salomlash());









// class Shaxs {
//     constructor(ism, yosh){
//         this.ism = ism;
//         this.yosh = yosh;
//     }

//     salomlash(){
//         return `Salom, mening ismim ${this.ism} va men ${this.yosh} yoshdaman`
//     }
// }

// const odam = new Shaxs('Dil', 30)
// console.log(odam.salomlash());








// class Hisob{
//     balans;

//     constructor (balans){
//         this.balans =balans;
//     }

//     balans(){
//         return this.balans
//     }

//     pulKirit(miqdor){
//         if (miqdor > 0){
//             this.balans += miqdor;
//         }else{
//             console.log("Miqdor mubat bolishi kerak");
//         }
//     }


//     pulYech(miqdor){
//         if(miqdor > 0 && miqdor <= this.balans){
//             this.balans -= miqdor;
//         }else{
//             console.log("Notogri miqdor.");
//         }
//     }
// }

// const hisob = new Hisob(1000)
// console.log(hisob.balans);

// hisob.pulKirit(500)
// console.log(hisob.balans);

// hisob.pulYech(1000)
// console.log(hisob.balans);







//! Vorislik ////////////////////////////////////////////////////


// class Hayvon{
//     constructor(nomi){
//         this.nomi = nomi;
//     }


// ovozchiqar(){
//     return `${this.nomi} ovoz chiqarvotti`
// }
// }

// class It extends Hayvon{
//     constructor(nomi, turi){
//         super(nomi);
//         this.turi = turi;
//     }

//     info(){
//         return `${this.nomi} bu ${this.turi}`;
//     }
// }

// let hayvon1 = new Hayvon("Mushuk");

// let it1 = new It("Rex", "Ovcharka");

// console.log(hayvon1.ovozchiqar());
// console.log(it1.ovozchiqar());
// console.log(it1.info());







class Transport{
    constructor(nomi){

        if(this.constructor === Transport){
            throw new Error("Abstrakt sinfdan ob'ekt yaratilmaydi!");
        }
        this.nomi = nomi;
    }

    yurish(){
        throw new Error("Abstrakt metod chaqirilmaydi!")
    }
}

class Avtomobil extends Transport{
    constructor(nomi, model){
        super(nomi);
        this.model = model;
    }

    yurish(){
        return `${this.nomi} ${this.model} yurib ketmoqda`
    }
}

let avto = new Avtomobil("Chevrolet", "Nexia")
console.log(avto.yurish());