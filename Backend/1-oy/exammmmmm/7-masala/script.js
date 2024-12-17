class Avto {
  constructor(marka, model, year) {
    this.marka = marka;
    this.model = model;
    this.year = year;
  }
}
class YengilAvto extends Avto {
  constructor(marka, model, year) {
    super(marka, model, year);
  }
}
class YukAvto extends Avto {
  constructor(marka, model, year) {
    super(marka, model, year);
  }
}
class Garaj {
  constructor(joylarSoni) {
    this._avtolar = [];
    this.joylarSoni = joylarSoni;
  }
  get avtolar() {
    return this._avtolar;
  }
  joyla(yangiAvto) {
    if (this._avtolar.length + 1 > this.joylarSoni) {
      return console.log("Uzr joylar to'ldi");
    }
    if (yangiAvto instanceof Avto) {
      this._avtolar.push(yangiAvto);
      console.log("Yangi avto qoshildi");
    } else {
      console.log("Faqat Avtolar qo'shish mumkin");
    }
  }
}

const garage = new Garaj(2);

garage.joyla(new YengilAvto("Hyundai", "Elantra", 2019));
console.log(garage.avtolar);

garage.joyla("Moto");
garage.joyla(new YukAvto("Kamaz", "Kamaz77", 2000));
console.log(garage.avtolar);
garage.joyla(new YengilAvto("GM", "Nexia", 2018));
