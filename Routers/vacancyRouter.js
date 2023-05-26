const router = require('express').Router();
const VacanciesController = require('../Controllers/VacanciesController');
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/vacancies-create', authMiddleware, roleMiddleware(['admin']), VacanciesController.createVacancy);
router.delete('/vacancies-delete/:id', authMiddleware, roleMiddleware(['admin']), VacanciesController.deleteVacancy);
router.put('/vacancies-update/:id', authMiddleware, roleMiddleware(['admin']), VacanciesController.updateVacancy);
router.get('/vacancies', VacanciesController.getAllVacancies);

module.exports = router;