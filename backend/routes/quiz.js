const express = require('express');
const router = express.Router();
const { addQuestion, getAllQuestions, deleteQuestion, CounstofQuestions, solvedQuestions, fetchQuestionsOfQuiz, countsOfSolved, favoriteQuestion, getFavoriteQuestions , deleteFavoriteQuestion} = require('../controllers/quizController');
const { requireAuth } = require('../middleware/requireAuth');

router.post('/', addQuestion);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);
router.get('/count', CounstofQuestions);



router.use(requireAuth);

router.post('/completed', solvedQuestions);
router.get('/:email/questions', fetchQuestionsOfQuiz)
router.get('/:email/solved', countsOfSolved)
router.post ("/:email/favorite/:id", favoriteQuestion) 
router.get("/:email/favorite", getFavoriteQuestions)
router.delete("/:email/favorite/:id", deleteFavoriteQuestion)



module.exports = router;