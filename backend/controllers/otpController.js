const express  = require('express');
const otpUtils = require('../utils/otpUtils');
const { handleSuccess, handleFailure } = require('../../frontend/src/utils/toastUtils');

const otpSend = async(req, res) => {  
    const {email} = req.body;
    const subject = 'Party App OTP';
    const otp = Math.trunc(Math.random()*1000000);

    const mailId = await otpUtils(email, subject, otp);

    if(mailId){
        res.status(200).json({"otp":otp});
        handleSuccess("OTP sent");
    }else{
        handleFailure("Retry OTP")
    }


}

module.exports = otpSend;