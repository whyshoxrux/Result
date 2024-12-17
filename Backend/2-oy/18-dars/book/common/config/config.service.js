import dotenv from "dotenv";

dotenv.config();
export default function getconfig(name){
    return process.env[name];
}