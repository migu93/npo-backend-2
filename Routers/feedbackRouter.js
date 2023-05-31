const router = require('express').Router();
const FeedbackController = require('../Controllers/FeedbackController');

router.post('/feedback', FeedbackController.createFeedback);

module.exports = router;
