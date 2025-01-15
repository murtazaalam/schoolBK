const jwt = require('jsonwebtoken');

const jwtGenerator = (payload) => {
    try{
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
    }
    catch(err){
        console.log(err);
    }
}

const jwtVerify = (token) => {
    let isTokenVerify;
    try{
        isTokenVerify = jwt.verify(token, process.env.JWT_SECRET);
        return isTokenVerify;
    }catch(err){
        isTokenVerify = false;
        return isTokenVerify;
    }
}

module.exports = {
    jwtVerify,
    jwtGenerator
}