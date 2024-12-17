import { pool } from "../../common/database/database.service.js";
import { createUserValidator, loginValidator } from "./user.validator.js";
import bcrypt from "bcryptjs"

export async function addUser(req, res){
    try{
        const newUser = req.body;
        const {error} = createUserValidator.validate(newUser);
        if(error){
            return res.send(error.details[0].message);
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 10)
        const result = await pool.query(`
            INSERT INTO users (
            first_name, second_name, email, password, age
            )  VALUES ($1,$2,$3,$4,$5)
              RETURNING * 
            `, [newUser.first_name, newUser.second_name, newUser.email, hashedPassword, newUser.age]);
            res.send(result.rows[0])
    } catch(err){
        res.send("Xatolik boldi: " + err.message)
    }
    
}

export async function loginUser(req, res){
    try{
        const {error} = loginValidator.validate(req.body);
        if(error){
            return res.send(error.details[0].message)
        }

        const {email, password} = req.body;
        const result = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [email]);
        const dbUser = result.rows[0];

        if(!dbUser){
            return res.send("Bunday email royxatdan otmagan")
        }
        const checkPassword = await bcrypt.compare(password, dbUser.password)

        if(!checkPassword){
            return res.send("Email yoki parol xato")
        }
        console.log("checkPassword", checkPassword);
        res.send("ok")
        
    } catch(err){
        res.send("Xatolik boldi: " + err.message)
        console.log(err);
        
    }
}

export async function getAll(req, res){
    console.log(req.body);
    
    try{const result = await pool.query(`SELECT * FROM users`)
    res.send(result.rows)
    } catch(err){
        res.send("Xato: " + err.message)
    }
}