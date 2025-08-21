const jwt = require('jsonwebtoken');

const cascadeAuth = (req, res, next) => {
    const auth = req.headers['authorization'];

    if(!auth){
        res.status(401).json({"message":"Unauthorized Access"});
    }

    try{
        const decode = jwt.verify(auth, process.env.JWT);
        req.user = decode;
        next();
    }catch(err){
        res.status(403).json({"message":`Token expired/ wrong, ${err}`})
    }
};

module.exports = cascadeAuth;