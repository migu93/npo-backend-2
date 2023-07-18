const Feedback = require('../models/FeedbackSchema');
const Email = require('../models/EmailSchema');
const nodemailer = require("nodemailer");

class FeedbackController {
    async createFeedback(req, res) {
        const { name, contact } = req.body;
        const adminEmail = await Email.findOne();
        try {
            // Create a Nodemailer transporter
            const transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru', // Replace with your email service provider's SMTP server
                port: 25, // Replace with the SMTP server port
                secure: false, // Set to true if your SMTP server requires a secure connection
                auth: {
                    user: 'feedbacknpo@mail.ru', // Replace with the email address
                    pass: 'i8VRJtJXGPWg6JzFmyXn', // Replace with the email password
                },
            });

            // Prepare the email message
            const message = {
                from: 'От отправителя feedbacknpo@mail.ru',
                to: adminEmail.email, // Specify the administrator's email here
                subject: 'Заявка на связь с пользователем',
                text: `User Name: ${name}\nContact: ${contact}`,
            };

            // Send the email
            const info = await transporter.sendMail(message);

            console.log('Message sent:', info.messageId);

            // Create a feedback document in the database
            const feedback = new Feedback({ name, contact });
            await feedback.save();

            // Respond with a success message
            res.status(200).json({ message: 'Feedback request sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending feedback request' });
        }
    }
}

module.exports = new FeedbackController();
