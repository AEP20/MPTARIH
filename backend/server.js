const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");


mongoose.set('strictQuery', true);

//express js
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user", userRoutes)
app.use("/api/miniQuiz", quizRoutes)



// connect to db , if can not connect, throw error else log success
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => 
    app.listen(process.env.PORT, () => {
        console.log(`connected to db, server is running on port ${process.env.PORT}`);
      })  
    )
    .catch((err) => console.log(err));
