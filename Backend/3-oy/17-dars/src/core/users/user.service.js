import getConfig from "../../common/config/config.service.js";
import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exception/custom.error.js";
import registerValidator from "./register.validator.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmailConfirmation } from "../../common/service/mail.service.js";

export async function register(req, res, next){
    try {
        console.log(req.body);
        
        const newUser = req.body;
        const {error} = registerValidator.validate(newUser); 
        if(error){
            throw new CustomError("Bunday email oldin ro'yxatdan o'tgan")
        }

        const dbUser = await findUserByEmail(newUser.email)

        // if(dbUser){
        //     throw new CustomError("Bunday email oldin ro'yxatdan o'tgan", 401);
        // }

        const hashedPassword = hashPassword(newUser.password);

        await pool.query(`
            INSERT INTO users (
            first_name, second_name, email, password
            ) VALUES ($1, $2, $3, $4) RETURNING * 
            `,
        [newUser.first_name, newUser.second_name, newUser.email, hashedPassword]);

        const EmailConfirmationToken = await generateEmailConfirmationToken({
            email: newUser.email,
        })

        await sendEmailConfirmation(
            newUser.email,
            newUser.first_name,
            EmailConfirmationToken
        );
        res.status(200).send("Email tasdiqlash uchun jo'natildi");
    } catch (err) {
        console.log(err)
        next(err)
    }
}

function generateEmailConfirmationToken(data){
    return jwt.sign(data, getConfig("JWT_EMAIL_CONFIRMATION_SECRET"),{expiresIn: "15m"})
}

export async function getAllUsers(req, res){
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.status(200).send(result.rows);
    } catch (err) {
        next(err)
    }
}

export async function verifyEmail(req, res){
    try {
        const {token} = req.params;

        const resultJwt = await jwt.verify(token, getConfig("JWT_EMAIL_CONFIRMATION_SECRET"));

        const result = await pool.query(
            `
            UPDATE users SET is_active=$1 WHERE email=$2
            `, [true, resultJwt.email]
        );
        res.status(200).send("Email tasdiqlandi");
    } catch (error) {
        next(error)
    }
}

export async function login(req, res, next) {
    try {
        const user = req.body;
        const {error} = registerValidator.validate(user);

        if(error){
            throw new CustomError(error.details[0].message, 400);
        }

        const dbUser = await findUserByEmail(user.email);

        if(!dbUser){
            throw new CustomError("Email yoki parol xato", 403);
        }

        const checkPasswordResult = checkPassword(user.password, dbUser.password)

        if(!checkPasswordResult){
            throw new CustomError("Email yoki parol xato", 403)
        }

        const accessToken = await generateAccessToken({email: user.email});
        const refreshToken = await generateRefreshToken({email: user.email});

        res.status(200).send({accessToken, refreshToken})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

function generateAccessToken(data){
    return jwt.sign(data, getConfig("JWT_ACCESS_SECRET"), {expiresIn: "15m"})
}

function generateRefreshToken(data){
    return jwt.sign(data, getConfig("JWT_REFRESH_TOKEN"), {expiresIn: "8h"})
}

function checkPassword(password, hashedPassword){
    return bcrypt.compare(password, hashedPassword)
}

function hashPassword(password){
    return bcrypt.hash(password, 10)
}

export async function findUserByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result.rows[0]
}