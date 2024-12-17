import { pool } from "../../common/database/database.service.js";
import { bot } from "../../common/service/service.js";
import { findUserByPhone } from "../user/user.service.js";

const payments = {};

export async function renderTransferConfirm(req, res){
    res.render("payment-confirm", {layout: false});
}
export async function renderTransfer(req, res) {
    const {phone} = req.user;

    const dbUser = await findUserByPhone(phone);

    if(!dbUser){
        return res.send("Telegram botdan ro'yxatdan o'ting");
    }
    res.render("transfer-money", {layout: false})
}
function generateCode(){
    return Math.floor(Math.random() * 90000 + 10000);
}

export async function TransferConfirm(req, res){
    try {
        const {phone} = req.user;
        const payment = payments[phone];

        if(Date.now() > payment.expiration){
            return res.send("Code expired");
        }
        if(payment.random != req.body.code){
            return res.send("Error code");
        }

        const {id} = req.params;
        const old = await pool.query(`SELECT  * FROM users WHERE id = $1`, [id]);

        const neww = req.body;
        const {first_name, second_name, phone: newPhone, password, balance, telegram_id} = {...old, ...neww};

        const result = await pool.query(`
            UPDATE users SET first_name = $1, second_name = $2, phone = $3, password = $4, balance = $5, telegram_id = $6 WHERE id = $7
            `, [first_name, second_name, newPhone, password, balance, telegram_id, id])
            res.status(200).send(result.rows[0]);
        
        res.send("Pul jo'natildi");
    } catch (error) {
        res.send("Error: " + error.message)
    }
}

export async function resendCode(req, res){
    try {
        const {telegram_id, phone} = req.user;
        console.log("resendCode", {telegram_id, phone});

        const random = generateCode();
        const oldPayment = payments[phone];
        console.log("payments", payments);
        
        if(Date.now() < oldPayment.expiration){
            return res.send("SMS ni 20s ichida jo'natish mumkin")
        }
        payments[phone] = {...oldPayment, random, expiration: Date.now() + 20000};

        await bot.sendMessage(telegram_id, `To'lovni tasdiqlash uchun kod ${random}`);
        res.send("ok")
    } catch (error) {
        console.log(error.message)
    }
}

export async function transfer(req, res){
    try {
        const {telegram_id, phone} = req.user;
        const random = generateCode();
        payments[phone] = {
            toUserPhone: req.body.phone,
            amount: req.body.amount,
            random,
            expiration: Date.now() + 20000
        };

        await bot.sendMessage(
            telegram_id, `To'lovni tasdiqlash uchun kod ${random}`
        );
        res.redirect("/payment.transfer-confirm")
    } catch (error) {
        console.log(error.message)
    }
}
