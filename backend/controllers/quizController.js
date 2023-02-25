const Question = require("../models/questionModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const addQuestion = async (req, res) => {
  const { question, answerA, answerB, answerC, answerD, correctAnswer, thema } =
    req.body;
  try {
    const newQuestion = await Question.create({
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      correctAnswer,
      thema,
    });
    res.status(201).json({ newQuestion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  console.log("deneme");
  try {
    const { thema } = req.query;
    console.log(thema);
    const query = thema ? { thema } : {};
    //get all question by filter as thema
    const questions = await Question.find(query);
    res.status(200).json({ questions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ deletedQuestion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const CounstofQuestions = async (req, res) => {
  try {
    const questionCounts = await Question.aggregate([
      {
        $group: {
          _id: "$thema",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json({ questionCounts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const detailedCount = async (req, res) => {
    try {
        const freeQuestions = await Question.aggregate([
            {
                $match: { isPremium: false }
            },
            {
                $group: {
                    _id: "$thema",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ]);
        const premiumQuestions = await Question.aggregate([
            {
                $match: { isPremium: true }
            },
            {
                $group: {
                    _id: "$thema",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ]);
        res.status(200).json({freeQuestions, premiumQuestions});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const solvedQuestions = async (req, res) => {
  const themaMap = {
    Konu1: 0,
    Konu2: 1,
    Konu3: 2,
    Konu4: 3,
    Konu5: 4,
    Konu6: 5,
    Konu7: 6,
    Konu8: 7,
    Konu9: 8,
    Konu10: 9,
    Konu11: 10,
    Konu12: 11,
    Konu13: 12,
    Konu14: 13,
    Konu15: 14,
    Konu16: 15,
    Konu17: 16,
  };

  const { user_email, correctlyAnsweredIds } = req.body;
  try {
    const user = await User.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.solvedQuestions.addToSet(...correctlyAnsweredIds);

    const updatedUser = await user.save();

    const numberOfQuestions = correctlyAnsweredIds.length;

    const firstQuestion = await Question.findById(correctlyAnsweredIds[0]);
    const thema = firstQuestion.thema;

    if (thema in themaMap) {
      user.solvedThemas[themaMap[thema]] += numberOfQuestions;
      console.log(thema);
    }

    const updatedUser2 = await user.save();

    res
      .status(200)
      .json({
        message: "Correctly answered questions added to user document.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchQuestionsOfQuiz = async (req, res) => {
  try {
    const { thema } = req.query;
    const query = thema ? { thema } : {};
    const questions = await Question.find(query).sort({ createdAt: -1 });

    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const solvedQuestions = user.solvedQuestions;
    const unsolvedQuestions = questions.filter(
      (question) => !solvedQuestions.includes(question._id.toString())
    );
    const shuffledQuestions = unsolvedQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(
      0,
      Math.min(shuffledQuestions.length, 5)
    );

    res.status(200).json({ questions: selectedQuestions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const countsOfSolved = async (req, res) => {
  const { thema } = req.query;
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ solvedThemas: user.solvedThemas[thema] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const favoriteQuestion = async (req, res) => {
  const { user_email, question_id } = req.body;
  try {
    const user = await User.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteQuestions.addToSet(question_id);

    const updatedUser = await user.save();

    res.status(200).json({ message: "Question added to favorites." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoriteQuestions = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    const { thema } = req.query;
    console.log(thema);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteQuestions = user.favoriteQuestions;
    const questions = await Question.find({
      _id: { $in: favoriteQuestions },
    }).sort({ createdAt: -1 });
    const filteredQuestions = thema
      ? questions.filter((question) => question.thema === thema)
      : questions;
    res.status(200).json({ questions: filteredQuestions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavoriteQuestion = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteQuestions.pull(req.params.id);
    const updatedUser = await user.save();
    res.status(200).json({ message: "Question deleted from favorites." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateIsPremium = async (req, res) => {
    const { id } = req.params;
    const { isPremium } = req.body;
  try {
    const question = await Question.findById(id);

    question.isPremium = isPremium;

    await question.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the question.' });
  }
};


    

module.exports = {
  addQuestion,
  getAllQuestions,
  deleteQuestion,
  CounstofQuestions,
  solvedQuestions,
  fetchQuestionsOfQuiz,
  countsOfSolved,
  favoriteQuestion,
  getFavoriteQuestions,
  deleteFavoriteQuestion,
  updateIsPremium,
  detailedCount
};
