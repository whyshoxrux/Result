import { bot } from "../../common/service/bot.service.js";
import UserModel from "../user/user.model.js";
import { findUserByPhone } from "../user/user.service.js";

const payments = {}

export async function renderTransferConfirm(req, res){
    res.render("payment-confirm", {layout: false})
}

export async function renderTransfer(req, res){
    const {phone} = req.user;

    const dbUser = await findUserByPhone(phone);

    if(!dbUser.telegram_id){
        return res.send("Telegram botdan ro'yxatdan o'ting");
    }
    res.render("transfer-money", {layout: false});
}

function generateCode(){
    return Math.floor(Math.random() * 90000 + 10000);
}

export async function transferConfirm(req, res){
    try {
        const {phone} = req.user;
        const payment = payments[phone];

        if(Date.now() > payment.expiration){
            return res.send("Code expired")
        }
        if(payment.random != req.body.code){
            return res.send("Error code")
        }
        await UserModel.update(
            {balance: req.user.balance - parseFloat(payment.amount)},
            {where: {phone}}
        );
        const toUser = await findUserByPhone(payment.toUserPhone);

        await UserModel.update(
            {balance: toUser.balance + parseFloat(payment.amount)},
            {where: {phone: payment.toUserPhone}}
        );
        res.send("Pul jo'natildi")
    } catch (err) {
        res.send("Error: " + err.message)
    }
}

export async function resendCode(req, res){
    try {
        const {telegram_id, phone} = req.user;
        console.log("resendCode 2", {telegram_id, phone});
        const random = generateCode()
        const oldPayment = payments[phone];
        console.log("payment", payments);

        if(Date.now() < oldPayment.expiration){
            return res.send("SMS ni 20s ichida jo'natish mumkin");
        }
        payments[phone] = {...oldPayment, random, expiration: Date.now() + 20000};

        await bot.sendMessage(
            telegram_id, `To'lovni tasdiqlash uchun kod ${random}`
        );
        res.send("ok")
        
        
    } catch (err) {
        res.send("Error: " + err.message)
    }
}

export async function transfer(req, res) {
    try {
        const {telegram_id, phone} = req.user;
        const random = generateCode();
        payments[phone] = {
            toUserPhone: req.body.phone,
            amount: req.body.amount,
            random,
            expiration: Date.now() + 20000
        }

        await bot.sendMessage(
            telegram_id, `To'lovni tasdiqlash uchun kod ${random}`
        );
        res.redirect("/payment/transfer-confirm")
    } catch (err) {
        res.send("Error: " + err.message)
    }
}