import jwt from 'jsonwebtoken'
import getConfig from '../config/config.service.js'
import {findUserByEmail} from "../../core/user.service.js"

export default async function authguard(req, res, next){
    try{
        const token = req.cookies?.token;
        console.log(token);
        if(!token){
            return res.redirect("http://localhost:4000/user/login")
        }

        const result = jwt.verify(token, getConfig("JWT_ACCCES_SECRET"));
        await findUserByEmail(result.email)
        next();
    } catch(err){
        console.log(err);
        
        res.send("Notogri kalit: " + err)
    }
}
