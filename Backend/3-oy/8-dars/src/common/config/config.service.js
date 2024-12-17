import dotenv from 'dotenv'
dotenv.config()
export function getconfig(name){
    return process.env[name]
}