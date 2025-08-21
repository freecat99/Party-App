const jwt = require('jsonwebtoken');

const cascadeAuth = (req, res, next) => {
    const auth = req.headers['authorization'];

    if(!auth){
        return res.status(401).json({"message":"Unauthorized Access"});
    }

    try{
        const decode = jwt.verify(auth, process.env.JWT);
        req.user = decode;
        return next();
    }catch(err){
        return res.status(403).json({"message":`Token expired/ wrong, ${err}`})
    }
};

module.exports = cascadeAuth;