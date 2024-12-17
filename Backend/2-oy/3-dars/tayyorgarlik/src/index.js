import fs from "fs/promises";

export async function faylgaYozish(manzil, malumot) {
  try {
    await fs.writeFile(manzil, JSON.stringify(malumot));
    return "Malumot muvaffaqtiyatli yozildi";
  } catch (err) {
    console.log(err);
    return "Faylga yozishda xatolik boldi";
  }
}

export async function faylgaOqish(manzil) {
  try {
    const malumotJson = await fs.readFile(manzil, "utf8");
    return JSON.parse(malumotJson);
    
  } catch (err) {
    return "Faylga oqishda xatolik boldi";
  }
}
