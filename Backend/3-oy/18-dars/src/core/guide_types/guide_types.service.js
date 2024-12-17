import { pool } from "../../common/database/database.service.js";

export async function add(req, res, next){
    try {
        const newData = req.body
        const result = await pool.query(`
            INSERT INTO guide_types(name) VALUES($1) RETURNING *
            `, [newData.name])
            res.send(result.rows[0])
    } catch (error) {
        next(error)
    }
}

export async function getAll(req, res, next){
    try {
        const newData = req.body;

        const result = await pool.query(`SELECT * FROM guide_types`)
        res.sendd(result.rows)
    } catch (error) {
        next(error)
    }
}
