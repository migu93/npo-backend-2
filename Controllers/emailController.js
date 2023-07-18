const Email = require('../models/EmailSchema');

// Создание новой записи
async function createEmail(req, res) {
    try {
        const { email } = req.body;
        const newEmail = await Email.create({ email });
        res.status(201).json(newEmail);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании email', error });
    }
}

// Получение всех записей
async function getAllEmails(req, res) {
    try {
        const emails = await Email.find();
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении email', error });
    }
}

// Получение записи по ID
async function getEmailById(req, res) {
    try {
        const { id } = req.params;
        const email = await Email.findById(id);
        if (!email) {
            return res.status(404).json({ message: 'Email не найден' });
        }
        res.json(email);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении email', error });
    }
}

// Обновление записи по ID
async function updateEmailById(req, res) {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const updatedEmail = await Email.findByIdAndUpdate(id, { email }, { new: true });
        if (!updatedEmail) {
            return res.status(404).json({ message: 'Email не найден' });
        }
        res.json(updatedEmail);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении email', error });
    }
}

// Удаление записи по ID
async function deleteEmailById(req, res) {
    try {
        const { id } = req.params;
        const deletedEmail = await Email.findByIdAndDelete(id);
        if (!deletedEmail) {
            return res.status(404).json({ message: 'Email не найден' });
        }
        res.json(deletedEmail);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении email', error });
    }
}

module.exports = {
    createEmail,
    getAllEmails,
    getEmailById,
    updateEmailById,
    deleteEmailById,
};
