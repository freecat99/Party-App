const joi = require('joi');

const signUpValidate = (req, res, next)=>{
    const schema = joi.object({
        name:joi.string().min(3).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(30).required(),
    });
    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({
            "message":'Bad Request',
            "error":error
        })
    }
    next();
}

const loginValidate = (req, res, next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).max(30).required(),
    });
    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({
            "message: ":'Bad Request',
            "error":error
        })
    }
    next();
}

module.exports = {
    signUpValidate,
    loginValidate    
}