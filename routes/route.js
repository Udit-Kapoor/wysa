const authController = require("../controllers/authController");
const questionController = require("../controllers/questionController");
const responseController = require("../controllers/responseController");
const router = require("express").Router();


//TODO : Add Validations to schema
//TODO : Refactor routes into seperate files 

router.post('/signup' , authController.signup);
router.post('/login', authController.login);

router.get('/questions' , questionController.getQuestions);
router.post('/addQuestion' , questionController.addQuestion);

router.post('/response' , responseController.submitAnswer);

module.exports = router;