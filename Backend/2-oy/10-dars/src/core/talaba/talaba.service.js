import {pool} from "../../common/databases/database.service.js"

export async function addStudent(req, res){
    try {
        const {ism, familiya, email, phone_number} = req.body;
        // console.log(body);
        
        const result = await pool.query(
            `
            INSERT INTO students (ism, familiya, email, phone_number) VALUES
            ($1, $2, $3, $4) RETURNING *
            
            `, [ism, familiya, email, phone_number]
        );
        res.send(result.rows[0]);
    } catch (err){
        console.log("Error adding student info",err.message);
    }
}

export async function getAllStudent(req, res) {
    try{
        const result = await pool.query(`SELECT * FROM students`);
        res.send(result.rows);
    } catch (err){
        res.send("Error getting students info");
    }
}
export async function getStudent(req, res){
    try {
        const {id} = req.params;
        const result = await pool.query(
            `
            SELECT id, ism, familiya, FROM students WHERE id=$1
            
            `, [id]
        );
        res.send(result.rows);
    } catch(err){
        res.send("Error getting student info");
    }
}

export async function updateStudent(req, res){
    try {
        const {id} = req.params;
        const oldData = await pool.query(
            `
            SELECT * FROM students WHERE id=$1
            
            `,
            [id]
        );
        const body = req.body;
        const updateData = {...oldData.rows[0], ...body};
        const result = await pool.query(
            `
            UPDATE students SET ism=$1, familiya=$2, email=$3, phone_number=$4 WHERE id=$5 RETURNING *
            
            `,
            [
               updateData.ism,
               updateData.familiya ,
               updateData.email,
               updateData.phone_number,
               id,
            ]
        );
        res.send(result.rows[0]);
    } catch (err){
        res.send("Error updating student's info");
    }
}

export async function deleteStudent(req, res){
    const {id} = req.params;
    try{
        const result = pool.query(
            `
            DELETE FROM students WHERE id=$1 RETURNING *
            
            `,
            [id]
        );
        res.send(result.rows)
    } catch(err){
        res.send("Error deleting student's info");
    }
}