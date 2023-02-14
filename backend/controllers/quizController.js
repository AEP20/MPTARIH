const Question = require('../models/questionModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const addQuestion = async (req, res) => {
    const { question, answerA, answerB, answerC, answerD, correctAnswer,thema } = req.body;
    try {
        const newQuestion = await Question.create({
            question,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer,
            thema
        });
        res.status(201).json({ newQuestion });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const { thema } = req.query;
        const query = thema ? { thema } : {};
        const questions = await Question.find(query).sort({ createdAt: -1 });
        res.status(200).json({ questions });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.status(200).json({ deletedQuestion });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const CounstofQuestions = async (req, res) => {
    try {
        const questionCounts = await Question.aggregate([
            {
                $group: {
                  _id: "$thema",
                  count: { $sum: 1 }
                }
              },
              {
                $sort: { count: -1 }
              }
            ]);
        res.status(200).json({ questionCounts });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

const solvedQuestions = async (req, res) => {
    console.log("solvedQuestions !!!!")
    const { user_email, correctlyAnsweredIds } = req.body;
    try {
        console.log("req.body :" + req.body)
    
        console.log("user_email :" + user_email)
        console.log("correctlyAnsweredIds :" + correctlyAnsweredIds)

        const user = await User.findOne({ email: user_email });

        console.log("user :" + user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Add the solved question IDs to the user's solvedQuestions array
        user.solvedQuestions.push(...correctlyAnsweredIds);
    
        // Save the updated user document
        const updatedUser = await user.save();
        
        res.status(200).json({ message: 'Correctly answered questions added to user document.' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const fetchQuestionsOfQuiz = async (req, res) => {
    try {
        const { thema } = req.query;
        const query = thema ? { thema } : {};
        const questions = await Question.find(query).sort({ createdAt: -1 });

        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const solvedQuestions = user.solvedQuestions;
        const unsolvedQuestions = questions.filter(question => !solvedQuestions.includes(question._id.toString()));
        const shuffledQuestions = unsolvedQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, Math.min(shuffledQuestions.length, 5));

        res.status(200).json({ questions: selectedQuestions });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { addQuestion, getAllQuestions, deleteQuestion, CounstofQuestions, solvedQuestions , fetchQuestionsOfQuiz};

