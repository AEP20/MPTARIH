const express = require('express');
const router = express.Router();
const { addQuestion, getAllQuestions, deleteQuestion, CounstofQuestions, solvedQuestions, fetchQuestionsOfQuiz } = require('../controllers/quizController');

router.post('/', addQuestion);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);
router.get('/count', CounstofQuestions);
router.post('/completed', solvedQuestions);
router.get('/:email/questions', fetchQuestionsOfQuiz)



module.exports = router;