import CustomError from "../exception/custom.error.js";

const accessControle = (requiredRole) => {
    return (req, res, next) => {
        try {
            if(req.user.role === requiredRole){
                next();
            } else{
                throw new CustomError("Bu sahifaga huquqingiz yetarli emas", 401)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default accessControle;