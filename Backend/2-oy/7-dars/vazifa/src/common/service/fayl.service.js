import fs from "fs/promises";

export async function writeFileJSON(manzil, malumot) {
  const result = await fs.writeFile(manzil, JSON.stringify(malumot));
  return result;
}
export async function readFileJSON(manzil) {
  const result = await fs.readFile(manzil, "utf8");
  if (!result) {
    return "";
  }
  return JSON.parse(result);
}
