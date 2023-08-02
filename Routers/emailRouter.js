const express = require('express');
const router = express.Router();
const emailController = require('../Controllers/emailController');

// POST /emails - создание новой записи
router.post('/create-email', emailController.createEmail);

// GET /emails - получение всех записей
router.get('/get-email', emailController.getAllEmails);

// GET /emails/:id - получение записи по ID
router.get('/get-email/:id', emailController.getEmailById);

// PUT /emails/:id - обновление записи по ID
router.put('/update-email/:id', emailController.updateEmailById);

// DELETE /emails/:id - удаление записи по ID
router.delete('/delete-email/:id', emailController.deleteEmailById);

module.exports = router;
