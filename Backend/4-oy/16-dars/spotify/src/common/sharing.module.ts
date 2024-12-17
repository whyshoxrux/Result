import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";
import { EmailService } from "./service/mail.service";

@Global()
@Module({
    providers: [ConfigService, EmailService],
    exports: [ConfigService, EmailService]
})
export class SharingModule{}