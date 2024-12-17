const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router()
const cors = require("cors");
const crypto = require("crypto");

router.post("/payu/hash"),async(req,res)=>{
    const {name ,email , amount,transactionId} =req.body
    const data ={
        key:process.env.PAYU_MERCHANT_KEY,
        salt:process.env.PAYU_SALT,
        txnid:transactionId,
        amount:amount,
        productInfo:"productinfo",
        firstname:name,
        email:email
    }

    const cryp = crypto.createHash('sha512');
    const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productInfo + '|' +data.firstname + '|' + data.email + '|' +data.salt;

    cryp.update(string)
    const hash = cryp.digest('hex')

    return res.status(200).send({
        hash:hash,
        transactionId:transactionId
    })
}


module.exports = router