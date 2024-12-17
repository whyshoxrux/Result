import CustomError from "../exceptionFilter/custom.error.js";

const accessControl = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (req.user.role === requiredRole) {
        next();
      } else {
        throw new CustomError("Bu sahifaga huquqingiz yetarli emas", 401);
      }
    } catch (error) {
      next(error);
    }
  };
};
export default accessControl;
