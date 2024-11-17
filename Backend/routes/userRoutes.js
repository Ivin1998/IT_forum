const express = require('express');
const {authUser, registerUser} = require('../Controllers/userController');
const {  getAnswer, UpdateAnswer,deleteQuestion, getquestionsAnswer } = require('../Controllers/answerController');
const { AnswerMapping } = require('../Controllers/AnswermappingController');


const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
// router.route('/answers').post(Answer);
router.route('/multipleanswers').post(AnswerMapping);
router.route('/answers').get(getAnswer);
// router.route('/question/:id').get(getQuestion);
router.route('/questionsanswer/:id/:answerId').get(getquestionsAnswer);
router.route('/answers').put(UpdateAnswer);
router.route('/questions/:id').delete(deleteQuestion)




module.exports = router;