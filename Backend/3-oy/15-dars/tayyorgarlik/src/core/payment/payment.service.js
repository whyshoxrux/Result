import { bot } from "../../common/service/bot.service.js";
import UserModel from "../user/user.model.js";
import { findUserByPhone } from "../user/user.service.js";

const payments = {};

export async function renderTransferConfirm(req, res) {
  res.render("payment-confirm", { layout: false });
}

export async function renderTransfer(req, res) {
  try {
    const { phone } = req.user;

    const dbUser = await findUserByPhone(phone);
    if (!dbUser.telegram_id) {
      return res.send("Telegram botdan royxatdan o'ting");
    }
    res.render("transfer-money", { layout: false });
  } catch (err) {
    res.send("Error: " + err.message);
  }
}
function generateCode() {
  return Math.floor(Math.random() * 90000 + 10000);
}

// export async function transferConfirm(req, res) {
//   try {
//     const { phone } = req.user;
//     const payment = payments[phone];

//     if (payment.random != req.body.code) {
//       return res.send("Kod xato");
//     }
//     await UserModel.update(
//       { balance: req.user.balance - parseFloat(payment.amount) },
//       { where: { phone } }
//     );
//     const toUser = await findUserByPhone(payment.toUserPhone);

//     await UserModel.update(
//       { balance: toUser.balance + parseFloat(payment.amount) },
//       { where: { phone: payment.toUserPhone } }
//     );
//     res.send("Pul jonatildi");
//   } catch (err) {
//     res.send("Error: " + err.message);
//   }
// }



// export async function transfer(req, res) {
//   try {
//     const { telegram_id, phone } = req.user;
//     const random = generateCode();
//     payments[phone] = {
//       toUserPhone: req.body.phone,
//       amount: req.body.amount,
//       random,
//     };
//     await bot.sendMessage(
//         telegram_id, `To'lovni tasdiqlash uchun kod ${random}`
//     );
//     res.redirect("/payment/transfer-confirm");
//   } catch (err) {
//     console.log(err);
    
//     res.send("Error: " + err.message);
//   }
// }

export async function transferConfirm(req, res) {
  try {
    const {phone} = req.user;
    const payment = payments[phone];

    console.log(req.body.code);
    console.log(req.body.code);
    
    if(payment.expiresIn < Date.now()){
      return res.send("Kod eskirgan")
    }

    if(payment.random != req.body.code){
      return res.send("Kod xato")
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
    res.send("Serverda xatolik bo'ldi")
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
      expiresIn: Date.now() + 10 * 60 * 60
    }

    await bot.sendMessage(telegram_id, `To'lovni tasdiqlash uchun kod ${random}`);
    res.redirect("/payment/transfer-confirm")
  } catch (err) {
    console.log("Error: ", err.message);
    
  }
}