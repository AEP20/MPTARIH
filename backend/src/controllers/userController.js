const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const functions = require('firebase-functions');
const jwtSecret = functions.config().app.jwt_token_secret; 



const createToken = (_id) => {
    return jwt.sign({ _id }, jwtSecret)
};


const loginUser = async (req, res) => {
    console.log("loginUser")
    const { email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200).json({ email,token });
    } catch (error) {
        console.log("error.message :" + error.message)
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        
        const token = createToken(user._id)
        res.status(201).json({ email,token });
    } catch (error) {
        console.log("error.message :" + error.message)
        res.status(400).json({ error: error.message });
    }
}


module.exports = { loginUser, signupUser };