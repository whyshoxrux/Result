import { pool } from "../common/database/database.service.js";

export async function renderDormitory(req, res){
    res.render("dormitory", {layout: false})
}

export async function renderDormitoryList(req, res){
    try{
        const result = await pool.query(
            `SELECT * FROM dormitory;`
        )
        res.render("dormitory-list", {layout: false, dormitoryList: result.rows})
    } catch(err){
        res.send("Malumotlarni olishda xatolik: " + err.message)
    }
}

export async function createStudentDormitory(req, res){
    try{
        const newData = req.body;
        const result = await pool.query(`
            INSERT INTO dormitory(
            first_name,
            second_name,
            group_name,
            phone,
            address
            ) VALUES ($1,$2,$3,$4,$5) RETURNING *
            `,
        [
            newData.first_name,
            newData.second_name,
            newData.group_name,
            newData.phone,
            newData.address,
        ]
    )
    res.send(result.rows)
    } catch(err){
        res.send("Malumotlarni joylashda xatolik: " + err.message)
    }
}