const Feedback = require('../models/FeedbackSchema');

class FeedbackController {
    async createFeedback(req, res) {
        try {
            const {name, contact} = req.body;
            const feedback = new Feedback({name, contact});
            await feedback.save();
            return res.json({message: "Feedback successfully sent"});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Error in sending feedback'});
        }
    }
}

module.exports = new FeedbackController();
