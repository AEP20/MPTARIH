const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const functions = require('firebase-functions');
const jwtSecret = functions.config().app.jwt_token_secret; 





const requireAuth = async(req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "You must be logged in."});
    }

    const token = authorization.split(" ")[1];

    try {
        const {_id} = jwt.verify(token, jwtSecret);
        req.user = await User.findById({_id}).select("_id");; 
        next();

        
    }catch(e){
        res.status(401).json({error: "You must be logged in."});
    }

}

module.exports = { requireAuth };