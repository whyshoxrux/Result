import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            method: request.url,
        })
    }
}