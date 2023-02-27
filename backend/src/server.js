const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const functions = require("firebase-functions");

const PORT = 4000;
const MONGO_URI= "mongodb+srv://ahmet_emre:emre244c@mpykstarih.5vsodvd.mongodb.net/?retryWrites=true&w=majority"




mongoose.set('strictQuery', true);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes)
app.use("/miniQuiz", quizRoutes)

app.get("/", (req, res) => {
    res.send("hello world");
});



mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => 
    app.listen(PORT, () => {
        console.log(`connected to db, server is running on port ${PORT}`);
      })  
    )
    .catch((err) => console.log(err));

exports.api= functions.https.onRequest(app);