import { Body, Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    createUser(body){
        console.log(body)
        return body
    }
}