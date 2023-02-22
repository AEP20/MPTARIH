const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question : {
        type: String,
        required: true,
    },
    answerA : {
        type: String,
        required: true,
    },
    answerB : {
        type: String,
        required: true,
    },
    answerC : {
        type: String,
        required: true,
    },
    answerD : {
        type: String,
        required: true,
    },
    correctAnswer : {
        type: String,
        required: true,
    },
    thema : {
        type: String,
        required: true,
    },
    isPremium :{
        type: Boolean,
        default : false 
    }
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;