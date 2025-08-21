const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userDb');

const signup = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409).json({
                "message":"User already registered",
                "success":false
            });
        }
        const newUser = new userModel({name, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(200).json({
            "message":"Signup Success",
            "success":true
        })
    }catch(err){
        res.status(500).json({
            "message":`Internal Server Error, ${err}`,
            "success":false
        })

    }
};

const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                "message":"User Not Found",
                "success":false
            });
        }

        const validPass = await bcrypt.compare(password, user.password);

        if(!validPass){
            res.status(401).json({
                "message":"Invalid password!",
                "success":false
            })
        }

        const jwtToken = jwt.sign(
            {email:user.email, _id:user.id},
            process.env.JWT,
            {expiresIn:'24h'}
        );

        res.status(200).json({
            "message":"Login Success",
            "success":true,
            jwtToken, 
            email
        })

    }catch(err){
        res.status(500).json({
            "message":`Internal Server Error, ${err}`,
            "success":false
        })

    }
};

module.exports = {
    signup,
    login
}