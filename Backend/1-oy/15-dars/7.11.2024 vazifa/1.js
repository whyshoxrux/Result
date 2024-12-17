//! Abstraksiya va Inkapsulyatsiya. Avtomobil sinfini yarating. Bu sinfning ichki xususiyatlari (mashina markasi, model, tezlik) xususiy bo'lsin. Sinfda mashina tezligini oshirish va kamaytirish uchun metodlar bo'lsin

// class Transport{
//     #tezlik;
//     constructor(nomi, model, tezlik){
//         this.nomi = nomi;
//         this.model = model;
//         this.#tezlik = tezlik;
//     }

//     get tez(){
//         return this.#tezlik
//     }

//     tezlikniOshirish(miqdor){
//         if(miqdor > 0){
//             this.#tezlik += miqdor
//         }else{
//             console.log('Musbat bolsin');
//         }

//     }

//     tezlikniKamaytir(norma){
//         if(norma > 0 && norma <= this.#tezlik){
//             this.#tezlik -= norma
//         }else{
//             console.log("Error");
//         }
//     }

// }

// let avto = new Transport('Chevrolet', 'Tiko', 100)
// avto.tezlikniOshirish(20)
// console.log(avto.tez);

// avto.tezlikniKamaytir(100)
// console.log(avto.tez);

//!  Meros Masala: Hayvonlar sinfini yarating va u sinfdan it va mushuk sinflarini meros qiling. Har bir sinf uchun o'ziga xos tovush chiqarish metodini yarating.

// class Hayvon{
//     constructor(nomi){
//         this.nomi = nomi;
//     }

//     tovush(){
//         return `${this.nomi} meow layapti`;
//     }

//     vov(){
//         return `${this.nomi} vovullayapti`
//     }
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

// let it1 = new It("Rex", "Ovcharka")

// console.log(hayvon1.tovush());
// console.log(it1.vov());

//! Polimorfizm Masala: Geometrik shakllar uchun umumiy sinf yarating va undan kvadrat va doira sinflarini meros qiling. Har bir sinf uchun maydonni hisoblash metodini yozing.

// class Geometriya{
//     constructor(nom){
//         this.nom = nom
//     }

//     yuzi(en, boy){
//         return (en + boy) * 2
//     }
// }

// class Kvadrat extends Geometriya {

//     constructor(nom, tomon){
//         super(nom);
//         this.tomon = tomon;
//     }

//     yuzi(){
//         return this.tomon * this.tomon
//     }
// }

// class Doira extends Geometriya {
//     constructor(nom, radius){
//         super(nom);
//         this.radius = radius;
//     }

//     yuzi(n){
//         const pi = Math.PI
//         return pi * this.radius * this.radius;
//     }
// }
// const kv = new Kvadrat('Kvadrat', 5);

// const doira = new Doira('Doira', 4)

// function yuz(geo){
//     console.log(`${geo.nom} yuzasi: ${geo.yuzi()}`);

// }

// yuz(kv)
// yuz(doira)

//! Abstraksiya, Inkapsulyatsiya, Meros va Polimorfizm birgalikda Masala: Avtomobil va Mototsikl sinflarini yarating, Transport sinfidandan meros qilib oling. Transport sinfida umumiy metodlar bo'lsin va 5. Avtomobil va Mototsikl sinflarida ulardan foydalaning.

class Transport {
  constructor(brand, modeli, tezlik) {
    this.brand = brand;
    this.modeli = modeli;
    this.tezlik = tezlik;
  }
  qosh(n) {
    if (n > 0) {
      this.tezlik += n;
    } else {
      console.log("Musbat son kirit");
    }
  }

  ayir(n) {
    if (n > 0 && n <= this.tezlik) {
      this.tezlik -= n;
    } else {
      console.log("XATO");
    }
  }
}

class Moto extends Transport {
  #rang;
  constructor(brand, modeli, tezlik, rang) {
    super(brand, modeli);
    this.tezlik = tezlik;
    this.#rang = rang;
  }
  tezlik_ayir(n) {
    this.ayir(n);
  }
  tezlik_qosh(n) {
    this.qosh(n);
  }
  get_moto() {
    return `Brandi: ${this.brand}, Modeli: ${this.modeli}, ${
      this.tezlik
    } Tezlikga chiqadi ${this.#rang} rangda`;
  }
}
class Auto extends Transport {
  #rang;
  constructor(brand, modeli, tezlik, rang) {
    super(brand, modeli);
    this.tezlik = tezlik;
    this.#rang = rang;
  }

  tezlik_ayir(n) {
    this.ayir(n);
  }

  tezlik_qosh(n) {
    this.qosh(n);
  }

  get_auto() {
    return `Brandi: ${this.brand}, Modeli: ${this.modeli}, Tezligi: ${
      this.tezlik
    }, Rangi:${this.#rang}`;
  }
}

const moto = new Moto("BMW", "yava", 300, "kulrang");
const auto = new Auto("GM", "maluba", 200, "oq");
console.log(moto.get_moto());
console.log(auto.get_auto());

moto.tezlik_ayir(100);
auto.tezlik_ayir(100);

console.log(moto.get_moto());
console.log(auto.get_auto());

moto.tezlik_qosh(100);
auto.tezlik_qosh(100);

console.log(moto.get_moto());
console.log(auto.get_auto());
