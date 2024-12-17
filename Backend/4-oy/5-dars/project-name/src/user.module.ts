import { Module } from "@nestjs/common";
import { UserControllerV1, UserControllerV2 } from "./user.controller";

@Module({
    controllers: [UserControllerV1, UserControllerV2]
})
export class UserModule{}