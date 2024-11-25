const express = require('express');
const {authUser, registerUser} = require('../Controllers/userController');
const {  getAnswer, UpdateAnswer,deleteQuestion, getquestionsAnswer, searchAnswer, getCategoryquestion } = require('../Controllers/answerController');
const { AnswerMapping } = require('../Controllers/AnswermappingController');


const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route('/multipleanswers').post(AnswerMapping);
router.route('/answers').get(getAnswer);
router.route('/questionsanswer/:id/:answerId').get(getquestionsAnswer);
router.route('/answers').put(UpdateAnswer);
router.route('/questions/:id').delete(deleteQuestion);
router.route('/searchquestions/:text').get(searchAnswer);
router.route('/category/:category').get(getCategoryquestion);



module.exports = router;