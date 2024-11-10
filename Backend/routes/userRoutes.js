const express = require('express');
const {authUser, registerUser} = require('../Controllers/userController');
const { question } = require('../Controllers/questionController');
const { Answer, getAnswer, UpdateAnswer,getquestionsAnswer,deleteQuestion } = require('../Controllers/answerController');


const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route('/questions').post(question);
router.route('/answers').post(Answer);
router.route('/answers').get(getAnswer);
router.route('/questionsanswer').get(getquestionsAnswer);
router.route('/answers').put(UpdateAnswer);
router.route('/questions/:id').delete(deleteQuestion)




module.exports = router;