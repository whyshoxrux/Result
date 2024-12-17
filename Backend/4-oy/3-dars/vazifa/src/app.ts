//! 1 - Vazifa

// class Foydalanuvchi {
//   public ism: string;
//   private _email: string;
//   protected _yosh: number;

//   constructor(ism: string, email: string, yosh: number) {
//     this.ism = ism;
//     this._email = email;
//     this._yosh = yosh;
//   }

//   public get email(): string {
//     return this._email;
//   }

//   public set email(value: string) {
//     if (value.includes("@")) {
//       this._email = value;
//     } else {
//       throw new Error("Noto'g'ri email formati");
//     }
//   }

//   public get yosh(): number {
//     return this._yosh;
//   }

//   public set yosh(value: number) {
//     if (value > 0) {
//       this._yosh = value;
//     } else {
//       throw new Error("Yosh 0 dan katta bo'lishi kerak");
//     }
//   }
// }

// class Admin extends Foydalanuvchi {
//   public readonly rol: string;

//   constructor(ism: string, email: string, yosh: number, rol: string) {
//     super(ism, email, yosh);
//     this.rol = rol;
//   }

//   public override set email(value: string) {
//     console.log(`Admin emailni yangilamoqda: ${value}`);
//     super.email = value;
//   }

//   public override get email(): string {
//     return super.email;
//   }
// }

// const foydalanuvchi = new Foydalanuvchi("Jasur", "jasur@example.com", 19);
// console.log(foydalanuvchi.email);
// foydalanuvchi.email = "jasur2@example.com";
// console.log(foydalanuvchi.email);

// const admin = new Admin("Admin", "admin@example.com", 25, "superadmin");
// console.log(admin.rol);
// admin.email = "admin2@example.com";
// console.log(admin.email);

//! ____________________________________________________________________________

//! 2 - Vazifa

// class Matematika {
//   public static readonly PI: number = 3.14;
//   public static readonly E: number = 2.71;

//   public static doiraYuzi(radius: number): number {
//     return Matematika.PI * radius * radius;
//   }

//   public static kvadratYuzi(tomoni: number): number {
//     return tomoni * tomoni;
//   }
// }

// const doiraRadiusi = 5;
// const kvadratTomoni = 4;

// console.log(`PI: ${Matematika.PI}`);
// console.log(`E: ${Matematika.E}`);

// const doiraYuzi = Matematika.doiraYuzi(doiraRadiusi);
// console.log(`Doiraning yuzi: ${doiraYuzi}`);

// const kvadratYuzi = Matematika.kvadratYuzi(kvadratTomoni);
// console.log(`Kvadratning yuzi: ${kvadratYuzi}`);

//! ____________________________________________________________________________

//! 3 - Vazifa

// class Avtomobil {
//   public model: string;
//   protected yil: number;
//   private _tezlik: number;

//   constructor(model: string, yil: number, tezlik: number) {
//     this.model = model;
//     this.yil = yil;
//     this._tezlik = tezlik;
//   }

//   public get tezlik(): number {
//     return this._tezlik;
//   }

//   public set tezlik(value: number) {
//     if (value >= 0) {
//       this._tezlik = value;
//     } else {
//       throw new Error("Tezlik manfiy bo'lishi mumkin emas");
//     }
//   }

//   public tezlikniOshirish(qiymat: number): void {
//     this.tezlik += qiymat;
//     console.log(`${this.model} tezlik oshirildi: ${this.tezlik} km/h`);
//   }
// }

// class Elektromobil extends Avtomobil {
//   private batareyaDarajasi: number;

//   constructor(
//     model: string,
//     yil: number,
//     tezlik: number,
//     batareyaDarajasi: number
//   ) {
//     super(model, yil, tezlik);
//     this.batareyaDarajasi = batareyaDarajasi;
//   }

//   public override tezlikniOshirish(qiymat: number): void {
//     if (this.batareyaDarajasi < 20) {
//       console.log("Batareya darajasi past, tezlik oshirilmaydi.");
//     } else {
//       this.tezlik += qiymat;
//       console.log(`Elektromobil tezlik oshirildi: ${this.tezlik} km/h`);
//     }
//   }
// }

// const avtomobil = new Avtomobil("Toyota Supra", 2020, 120);
// avtomobil.tezlikniOshirish(20);

// const elektroAvtomobil = new Elektromobil("Tesla Model X", 2021, 150, 15);
// elektroAvtomobil.tezlikniOshirish(30);

// const elektroAvtomobil2 = new Elektromobil("Tesla Model X", 2021, 150, 80);
// elektroAvtomobil2.tezlikniOshirish(30);

//! ____________________________________________________________________________

//! 4 - Vazifa

// enum UserRole {
//   Admin = "Admin",
//   User = "User",
//   Guest = "Guest",
// }

// interface Foydalanuvchi {
//   id: number;
//   ism: string;
//   email: string;
//   rol: UserRole;
// }

// const foydalanuvchilar: Foydalanuvchi[] = [
//   {
//     id: 1,
//     ism: "Jasur",
//     email: "jasur@example.com",
//     rol: UserRole.Admin,
//   },
//   {
//     id: 2,
//     ism: "Ali",
//     email: "ali@example.com",
//     rol: UserRole.User,
//   },
//   {
//     id: 3,
//     ism: "Vali",
//     email: "vali@example.com",
//     rol: UserRole.Guest,
//   },
// ];

// foydalanuvchilar.forEach((foydalanuvchi) => {
//   console.log(
//     `ID: ${foydalanuvchi.id}, Ism: ${foydalanuvchi.ism}, Email: ${foydalanuvchi.email}, Rol: ${foydalanuvchi.rol}`
//   );
// });

//! ____________________________________________________________________________

//! 5 - Vazifa

// function filtrlash<T>(royxat: T[], filterFn: (element: T) => boolean): T[] {
//   return royxat.filter(filterFn);
// }

// const sonlar: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const juftSonlar = filtrlash(sonlar, (son) => son % 2 === 0);
// console.log("Juft sonlar:", juftSonlar);

// const sozlar: string[] = ["apple", "banana", "avocado", "blueberry"];
// const aHarfidanBoshlanuvchilar = filtrlash(sozlar, (soz) =>
//   soz.startsWith("a")
// );
// console.log("A harfidan boshlanuvchilar:", aHarfidanBoshlanuvchilar);

// interface Foydalanuvchi {
//   id: number;
//   ism: string;
//   rol: string;
// }

// const foydalanuvchilar: Foydalanuvchi[] = [
//   { id: 1, ism: "Jasur", rol: "Admin" },
//   { id: 2, ism: "Ali", rol: "User" },
//   { id: 3, ism: "Vali", rol: "Admin" },
// ];

// const adminlar = filtrlash(
//   foydalanuvchilar,
//   (foydalanuvchi) => foydalanuvchi.rol === "Admin"
// );
// console.log("Adminlar:", adminlar);

//! ____________________________________________________________________________

//! 6 - vazifa

// interface Foydalanuvchi {
//   id: number;
//   ism: string;
//   email: string;
// }

// const foydalanuvchi: Foydalanuvchi = {
//   id: 1,
//   ism: "Jasur",
//   email: "jasur@example.com",
// };

// type FoydalanuvchiTuri = typeof foydalanuvchi;

// console.log(foydalanuvchi);
// console.log("Foydalanuvchi turi:", foydalanuvchi as FoydalanuvchiTuri);

// type FoydalanuvchiKalitlari = keyof Foydalanuvchi;

// const kalitlar: FoydalanuvchiKalitlari[] = ["id", "ism", "email"];
// kalitlar.forEach((kalit) => {
//   console.log(`Kalit: ${kalit}, Qiymat: ${foydalanuvchi[kalit]}`);
// });

//! ____________________________________________________________________________

//! 7 - vazifa

enum Holat {
  Boshlangich = "Boshlangich",
  Jarayonda = "Jarayonda",
  Tugallangan = "Tugallangan",
}

interface Vazifa {
  nomi: string;
  holat: Holat;
}

const vazifa: Vazifa = {
  nomi: "TypeScriptni o'rganish",
  holat: Holat.Boshlangich,
};

console.log("Boshlang'ich holat:", vazifa.holat);

function holatniYangilash(
  vazifaObj: Vazifa,
  yangiHolat: keyof typeof Holat
): void {
  vazifaObj.holat = Holat[yangiHolat];
}

holatniYangilash(vazifa, "Jarayonda");
console.log("Yangilangan holat:", vazifa.holat);

holatniYangilash(vazifa, "Tugallangan");
console.log("Yakuniy holat:", vazifa.holat);
