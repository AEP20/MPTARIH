const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const functions = require("firebase-functions");
const uri = functions.config().app.mongo_uri;

const PORT = 4000;




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
    .connect(uri, {
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