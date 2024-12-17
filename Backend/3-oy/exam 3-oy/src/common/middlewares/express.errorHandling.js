import CustomError from "../exception/custom.error.js";
import { errorLogger } from "../service/logger.service.js";

export default function expressErrorHandling(err, req, res, next){
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    errorLogger.error(err.message);
    res.status(statusCode ?? 500).send(err.message);
}