import { Injectable } from "@nestjs/common";

@Injectable()

export class ConfigService{
    get(name){
        return process.env[name]
    }
}