import fs from "fs/promises";

export async function writeFileJSON(address, info){
    const result = await fs.writeFile(address, JSON.stringify(info))
    return result;
}

export async function readFileJSON(address){
    const result = await fs.readFile(address, "utf8");
    if(!result){
        return "";
    }
    return JSON.parse(result);
}