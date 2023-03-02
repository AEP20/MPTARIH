const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET = "1j2bn3kj1b21yvu2g412b34j1h2v3b12";


const requireAuth = async(req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "You must be logged in."});
    }

    const token = authorization.split(" ")[1];

    try {
        const {_id} = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById({_id}).select("_id");; 
        next();

        
    }catch(e){
        res.status(401).json({error: "You must be logged in."});
    }

}

module.exports = { requireAuth };